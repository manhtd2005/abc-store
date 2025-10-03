// Hàm tạo mảng ngẫu nhiên
export const getRandomElements = (arr, count) => {
  // Nếu count > độ dài mảng thì lấy hết
  if (count >= arr.length) return [...arr];

  const result = new Set();
  while (result.size < count) {
    const ramdomIndex = Math.floor(Math.random() * arr.length);
    result.add(arr[ramdomIndex]);
  }
  return [...result];
};
