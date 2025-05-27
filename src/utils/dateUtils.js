// 날짜 관련 유틸리티 함수 예시
export const formatDate = (date) => {
  // TODO: 날짜 포맷팅
};

// 날짜에서 년/월 추출
export const extractYearMonth = (dateStr) => {
  if (!dateStr) return null;
  // EXIF의 DateTimeOriginal은 "YYYY:MM:DD HH:MM:SS" 형식
  const [date] = dateStr.split(' ');
  const [year, month] = date.split(':');
  return { year, month };
};

// 여러 사진에서 중복 없이 년/월 추출
export const getUniqueYearMonths = (photos) => {
  const set = new Set();
  photos.forEach(photo => {
    if (photo.date) {
      const ym = extractYearMonth(photo.date);
      if (ym) set.add(`${ym.year}년 ${ym.month}월`);
    }
  });
  return Array.from(set);
}; 