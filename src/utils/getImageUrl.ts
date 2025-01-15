import { s3bucketUrlPrefix } from '@/config/env';

export interface ImageFile {
  createdAt: string;
  extension: string;
  folder: string;
  id: string;
  name: string;
}
export const getImageUrl = (file?: ImageFile) => {
  if (file) {
    return `${s3bucketUrlPrefix}/${file.folder}/${file.id}.${file.extension}`;
  }
};
