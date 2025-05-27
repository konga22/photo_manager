import React, { useContext, useState } from 'react';
import { PhotoContext } from '../contexts/PhotoContext';
import { getExifData } from '../utils/exifUtils';
import { getUniqueYearMonths } from '../utils/dateUtils';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 스타일 컴포넌트 정의
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

const Button = styled.button`
  background: ${props => props.primary ? '#03c75a' : props.danger ? '#dc3545' : '#1976d2'};
  color: #fff;
  border: none;
  border-radius: 4;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

function SortablePhoto({ photo, idx, photos, setPhotos, defaultLocation }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: photo.name + idx });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: 10,
    background: '#f9f9f9',
    padding: 10,
    borderRadius: 4,
    border: '1px solid #eee',
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img
        src={URL.createObjectURL(photo.file)}
        alt={photo.name}
        style={{ width: 100, height: 'auto', marginRight: 10 }}
      /><br />
      {photo.name} <br />
      촬영일: {photo.date
        ? photo.date
        : photo.lastModified
          ? new Date(photo.lastModified).toLocaleString() + ' (콘텐츠 생성일)'
          : '정보 없음'} <br />
      위치: {photo.lat && photo.lon ? (
        <a
          href={`https://map.naver.com/v5/search/${photo.lat},${photo.lon}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1976d2', textDecoration: 'underline' }}
        >
          네이버지도에서 보기
        </a>
      ) : defaultLocation}
      <div style={{ margin: '5px 0' }}>
        <button
          style={{
            fontSize: 12,
            background: photo.uploadLocation ? '#1976d2' : '#aaa',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '2px 8px',
            cursor: 'pointer',
            marginRight: 5,
          }}
          onClick={() => {
            const newPhotos = [...photos];
            newPhotos[idx].uploadLocation = !newPhotos[idx].uploadLocation;
            setPhotos(newPhotos);
          }}
        >
          위치 {photo.uploadLocation ? '공개' : '비공개'}
        </button>
      </div>
      <input
        type="text"
        placeholder="사진 설명(캡션)"
        value={photo.caption || ''}
        onChange={e => {
          const newPhotos = [...photos];
          newPhotos[idx].caption = e.target.value;
          setPhotos(newPhotos);
        }}
        style={{ width: 100, marginTop: 5 }}
      />
      <button
        style={{ marginLeft: 10, color: 'red' }}
        onClick={() => {
          const newPhotos = photos.filter((_, i) => i !== idx);
          setPhotos(newPhotos);
        }}
      >
        제외
      </button>
    </li>
  );
}

function Editor() {
  const { photos, setPhotos } = useContext(PhotoContext);
  const [content, setContent] = useState(''); // 본문 입력 상태
  const [preview, setPreview] = useState(false);
  const [includeLocation, setIncludeLocation] = useState(true);
  const [location, setLocation] = useState(''); // 위치 정보 상태 추가
  const navigate = useNavigate();

  const titleFormat = localStorage.getItem('titleFormat') || '{year}년 {month}월의 추억';
  const defaultLocation = localStorage.getItem('defaultLocation') || '위치 정보 없음';

  // 제목 입력 상태 추가
  const [title, setTitle] = useState('');

  // 파일 업로드 핸들러
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    // 각 파일의 EXIF 정보 추출
    const photoData = await Promise.all(
      files.map(async (file) => {
        const exif = await getExifData(file);
        return {
          file,
          name: file.name,
          lastModified: exif.lastModified,
          date: exif.date,
          lat: exif.lat,
          lon: exif.lon,
          caption: '',
          uploadLocation: true,
        };
      })
    );

    // 촬영 시간(date) 또는 lastModified 기준으로 정렬
    photoData.sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : a.lastModified;
      const bTime = b.date ? new Date(b.date).getTime() : b.lastModified;
      return aTime - bTime;
    });

    setPhotos(photoData);
  };

  // 자동 제목 생성
  const yearMonths = getUniqueYearMonths(photos);
  const autoTitle = yearMonths.length > 0
    ? titleFormat.replace('{year}', yearMonths[0]?.split('년')[0])
               .replace('{month}', yearMonths[0]?.split(' ')[1]?.replace('월', ''))
    : '자동 제목 없음';

  // 미리보기 토글
  const handlePreview = () => setPreview(!preview);

  const handleDrop = async (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    await handleFileChange({ target: { files } });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = photos.findIndex((p, i) => (p.name + i) === active.id);
      const newIndex = photos.findIndex((p, i) => (p.name + i) === over.id);
      setPhotos(arrayMove(photos, oldIndex, newIndex));
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={{
      maxWidth: 700,
      margin: '40px auto',
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
      padding: 32
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: '#03c75a', margin: 0 }}>블로그 글쓰기</h2>
        <Button danger onClick={handleLogout}>로그아웃</Button>
      </div>

      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        style={{
          width: '100%',
          fontSize: 22,
          padding: '12px 16px',
          marginBottom: 24,
          border: '1px solid #ddd',
          borderRadius: 4
        }}
      />
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        style={{ border: '2px dashed #aaa', padding: 20, marginBottom: 20 }}
      >
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        <div>여기로 사진을 드래그&드롭 하세요.</div>
      </div>
      <div>
        <strong>자동 생성 제목:</strong> {autoTitle}
      </div>
      <div>
        <strong>블로그 본문 입력:</strong><br />
        <textarea
          rows={10}
          cols={60}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="여기에 블로그 내용을 입력하세요."
        />
      </div>
      <div style={{ margin: '10px 0' }}>
        <label>
          <input
            type="checkbox"
            checked={includeLocation}
            onChange={() => setIncludeLocation(!includeLocation)}
          />
          &nbsp;사진 위치정보 포함해서 업로드
        </label>
      </div>
      <div style={{ margin: '10px 0' }}>
        <ButtonGroup>
          <Button onClick={handlePreview}>미리보기</Button>
        </ButtonGroup>
      </div>
      {preview && (
        <div style={{ border: '1px solid #ccc', margin: '20px 0', padding: 10 }}>
          <h2>{autoTitle}</h2>
          <div>{content}</div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={photos.map((photo, idx) => photo.name + idx)}
              strategy={verticalListSortingStrategy}
            >
              <ul style={{ padding: 0, listStyle: 'none' }}>
                {photos.map((photo, idx) => (
                  <SortablePhoto
                    key={photo.name + idx}
                    photo={photo}
                    idx={idx}
                    photos={photos}
                    setPhotos={setPhotos}
                    defaultLocation={defaultLocation}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}

export default Editor; 