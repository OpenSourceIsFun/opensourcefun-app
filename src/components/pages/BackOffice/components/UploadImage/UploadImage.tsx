import { Button } from '@/components/common/Button';

import toast from 'react-hot-toast';

import { Input, Image } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { API_IMAGES } from '@/constants/routes';
import fetchJson from '@/services/fetchJson';
import { getToken } from '@/utils/auth';
import { useFormContext } from 'react-hook-form';
import { getImageUrl, ImageFile } from '@/utils/getImageUrl';

interface UploadImageProps {
  text: string;
  name: string;
  defaultValue?: ImageFile | null;
}

export const UploadImage = ({
  name,
  defaultValue = null,
  text = 'Upload Image',
}: UploadImageProps) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<ImageFile | null>(defaultValue);
  const { setValue } = useFormContext();

  const onClick = useCallback(async () => {
    const imageInput = document && document.getElementById(name);
    imageInput && imageInput.click();
  }, [name]);

  const onFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const file = e.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        const result = await fetchJson<ImageFile>(API_IMAGES, {
          method: 'POST',
          headers: new Headers({
            Authorization: getToken() || '',
          }),
          body: formData,
        });
        setFile(result);
        setValue(name, result.id);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        toast.error('Error uploading image file');
        console.log(e);
      }
    },
    [name, setValue],
  );

  return (
    <>
      <Input
        type="file"
        id={name}
        accept=".png, .jpg, .jpeg"
        display="none"
        onChange={onFileChange}
      />
      {file && (
        <Image
          src={getImageUrl(file)}
          maxHeight="200px"
          width="auto"
          objectFit="contain"
        />
      )}
      <Button variant="primary" isLoading={loading} onClick={onClick}>
        {text}
      </Button>
    </>
  );
};
