import * as exifr from 'exifr';

// EXIF 데이터 처리 함수 예시
export const getExifData = async (file) => {
  try {
    const exif = await exifr.parse(file, { gps: true });
    // exif 객체에 latitude, longitude, DateTimeOriginal 등이 포함됨
    return {
      date: exif.DateTimeOriginal
        ? exif.DateTimeOriginal.toISOString().replace('T', ' ').substring(0, 19)
        : null,
      lat: exif.latitude || null,
      lon: exif.longitude || null,
    };
  } catch (e) {
    return { date: null, lat: null, lon: null };
  }
};

// DMS(Degree, Minute, Second) 배열 + 방향 → 소수점 변환
export function dmsToDecimal(dms, ref) {
  if (!dms) return null;
  const [deg, min, sec] = dms;
  let dec = deg + min / 60 + sec / 3600;
  if (ref === 'S' || ref === 'W') dec = -dec;
  return dec;
} 