export type IProps = {
  onRequestRefesh: (tabActive: string) => void;
  // chỉ sử dụng chức năng chuyển tiền nội bộ
  onlyInAccount?: boolean;
};

export const Props: IProps = {
  onRequestRefesh: () => {},
  onlyInAccount: true,
};
