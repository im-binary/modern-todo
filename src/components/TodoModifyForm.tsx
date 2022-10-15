import Button from "./Button";

export default function TodoModifyForm({
  content,
  setIsModify,
  onChangeContent,
  handleModifySubmit,
}: {
  content: string;
  setIsModify: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeContent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleModifySubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <>
      <input type='text' value={content} onChange={onChangeContent} />
      <Button onClick={handleModifySubmit}>등록</Button>
      <Button onClick={() => setIsModify(false)}>취소</Button>
    </>
  );
}
