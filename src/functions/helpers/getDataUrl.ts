export async function getDataUrl({
  files,
}: {
  files: FileList | undefined;
}): Promise<string | null> {
  if (!files) return null;
  const file = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  await new Promise((resolve) => (reader.onload = () => resolve("")));
  return reader.result as string;
}
