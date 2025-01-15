import {
  Flex,
  FormControl,
  FormErrorMessage,
  InputGroup,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { FormInput } from '@/components/common/FormInput/FormInput';
import { Button } from '@/components/common/Button';
import styled from '@emotion/styled';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import fetchJson from '@/services/fetchJson';
import { API_PROJECTS } from '@/constants/routes';
import { useProjectMeta } from './ProjectMeta.hooks';
import { Project } from '../../BackOfficePage';
import { AddressCreationField } from '@/components/pages/BackOffice/components/AddressCreationField/AddressCreationField';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProjectMetaSchema } from '@/components/pages/BackOffice/components/ProjectMeta/ProjectMeta.schema';
import { UploadImage } from '@/components/pages/BackOffice/components/UploadImage/UploadImage';
import { Checkbox } from '@/components/common/Checkbox/Checkbox';
import { FormSelect } from '@/components/common/FormSelect/FormSelect';

export interface ProjectMetaFormData {
  alias: string;
  title: string;
  token: string;
  network: string;
  address: string;
  logoFileId?: string;
  bannerFieldId?: string;
  overview?: string;
  description?: string;
  majorContributor?: string;
  preferredExperience?: string;
  totalAllocation?: string;
  telegram?: string;
  discord?: string;
  twitter?: string;
  github?: string;
  siteUrl?: string;
  isPublic?: boolean;
}

interface ProjectMetaProps {
  project: Project;
  callback?: (id?: string) => Promise<void>;
}

export const ProjectMeta = ({ project, callback }: ProjectMetaProps) => {
  const { projectMeta, loading: isMetaLoading } = useProjectMeta(project.id);
  const [loading, setLoading] = useState(false);
  const formMethods = useForm<ProjectMetaFormData>({
    resolver: yupResolver(ProjectMetaSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const onSubmit: SubmitHandler<ProjectMetaFormData> = useCallback(
    async (data) => {
      try {
        setLoading(true);
        let response: {
          id?: string;
        } = {};
        if (project.id) {
          await fetchJson<string>(`${API_PROJECTS}/${project.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
          });
        } else {
          response = await fetchJson<{ id: string }>(API_PROJECTS, {
            method: 'POST',
            body: JSON.stringify({
              ...data,
              address: project.address,
            }),
          });
        }

        if (callback) {
          await callback(response.id);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    },
    [callback, project.address, project.id],
  );

  return (
    <FormProvider {...formMethods}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Flex gap="20px" justifyContent="center" alignItems="center">
          {isMetaLoading ? (
            <Spinner marginTop="10px" />
          ) : (
            <Flex width="100%" flexDirection="column" gap="10px">
              <FormControl isInvalid={!!errors.title}>
                <InputGroup>
                  <FormInput
                    hasRightElement
                    defaultValue={projectMeta?.title}
                    fieldName="title"
                    placeholder="Title"
                    control={control}
                  />
                </InputGroup>
                {errors.title && (
                  <FormErrorMessage
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="error"
                  >
                    {errors.title.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.network}>
                <InputGroup>
                  <FormSelect
                    control={control}
                    fieldName="network"
                    defaultValue={projectMeta?.network}
                  >
                    <option value="ETH">Ethereum Mainnet</option>
                    <option value="BSC">Binance Smart Chain</option>
                    <option value="Astar">Astar</option>
                  </FormSelect>
                </InputGroup>
                {errors.network && (
                  <FormErrorMessage
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="error"
                  >
                    {errors.network.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <AddressCreationField
                control={control}
                errors={errors}
                defaultValue={projectMeta?.address}
              />
              <FormControl isInvalid={!!errors.alias}>
                <InputGroup>
                  <FormInput
                    hasRightElement
                    defaultValue={projectMeta?.alias}
                    fieldName="alias"
                    placeholder="Alias"
                    control={control}
                  />
                </InputGroup>
                {errors.alias && (
                  <FormErrorMessage
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="error"
                  >
                    {errors.alias.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.token}>
                <InputGroup>
                  <FormInput
                    hasRightElement
                    defaultValue={projectMeta?.token}
                    fieldName="token"
                    placeholder="Ticker"
                    control={control}
                  />
                </InputGroup>
                {errors.token && (
                  <FormErrorMessage
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="error"
                  >
                    {errors.token.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.overview}>
                <InputGroup>
                  <FormInput
                    hasRightElement
                    defaultValue={projectMeta?.overview}
                    fieldName="overview"
                    placeholder="Overview"
                    control={control}
                  />
                </InputGroup>
                {errors.overview && (
                  <FormErrorMessage
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="error"
                  >
                    {errors.overview.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.description}>
                <InputGroup>
                  <FormInput
                    hasRightElement
                    defaultValue={projectMeta?.description}
                    fieldName="description"
                    placeholder="Description"
                    control={control}
                  />
                </InputGroup>
                {errors.description && (
                  <FormErrorMessage
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="error"
                  >
                    {errors.description.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.majorContributor}>
                <InputGroup>
                  <FormInput
                    hasRightElement
                    defaultValue={projectMeta?.majorContributor}
                    fieldName="majorContributor"
                    placeholder="Major Contributor"
                    control={control}
                  />
                </InputGroup>
                {errors.majorContributor && (
                  <FormErrorMessage
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="error"
                  >
                    {errors.majorContributor.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.preferredExperience}>
                <InputGroup>
                  <FormInput
                    hasRightElement
                    defaultValue={projectMeta?.preferredExperience}
                    fieldName="preferredExperience"
                    placeholder="Preferred Experience"
                    control={control}
                  />
                </InputGroup>
                {errors.preferredExperience && (
                  <FormErrorMessage
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="error"
                  >
                    {errors.preferredExperience.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.totalAllocation}>
                <InputGroup>
                  <FormInput
                    hasRightElement
                    defaultValue={projectMeta?.totalAllocation}
                    fieldName="totalAllocation"
                    placeholder="Total Allocation"
                    control={control}
                  />
                </InputGroup>
                {errors.totalAllocation && (
                  <FormErrorMessage
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="error"
                  >
                    {errors.totalAllocation.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.telegram}>
                <InputGroup>
                  <FormInput
                    hasRightElement
                    defaultValue={projectMeta?.telegram}
                    fieldName="telegram"
                    placeholder="Telegram"
                    control={control}
                  />
                </InputGroup>
                {errors.telegram && (
                  <FormErrorMessage
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="error"
                  >
                    {errors.telegram.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.discord}>
                <InputGroup>
                  <FormInput
                    hasRightElement
                    defaultValue={projectMeta?.discord}
                    fieldName="discord"
                    placeholder="Discord"
                    control={control}
                  />
                </InputGroup>
                {errors.discord && (
                  <FormErrorMessage
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="error"
                  >
                    {errors.discord.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.github}>
                <InputGroup>
                  <FormInput
                    hasRightElement
                    defaultValue={projectMeta?.github}
                    fieldName="github"
                    placeholder="Github"
                    control={control}
                  />
                </InputGroup>

                {errors.github && (
                  <FormErrorMessage
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="error"
                  >
                    {errors.github.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.twitter}>
                <InputGroup>
                  <FormInput
                    hasRightElement
                    defaultValue={projectMeta?.twitter}
                    fieldName="twitter"
                    placeholder="Twitter"
                    control={control}
                  />
                </InputGroup>
                {errors.twitter && (
                  <FormErrorMessage
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="error"
                  >
                    {errors.twitter.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.siteUrl}>
                <InputGroup>
                  <FormInput
                    hasRightElement
                    defaultValue={projectMeta?.siteUrl}
                    fieldName="siteUrl"
                    placeholder="Site URL"
                    control={control}
                  />
                </InputGroup>
                {errors.siteUrl && (
                  <FormErrorMessage
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="error"
                  >
                    {errors.siteUrl.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl width="100%">
                <Flex>
                  <Checkbox
                    control={control}
                    fieldName="isPublic"
                    alignItems="flex-start"
                  ></Checkbox>
                  <Text
                    marginLeft="11px"
                    fontSize={14}
                    lineHeight="24px"
                    color="primary.basic"
                    fontFamily="Poppins"
                  >
                    Public
                  </Text>
                </Flex>
              </FormControl>
              <UploadImage
                name="logoFileId"
                text="Upload Logo"
                defaultValue={projectMeta?.logoFile}
              />
              <UploadImage
                name="bannerFileId"
                text="Upload Banner"
                defaultValue={projectMeta?.bannerFile}
              />
              <Button
                variant="primary"
                type="submit"
                width="138px"
                alignSelf="flex-end"
                disabled={Object.keys(errors).length > 0}
              >
                {loading ? <Spinner /> : 'Save'}
              </Button>
            </Flex>
          )}
        </Flex>
      </StyledForm>
    </FormProvider>
  );
};

const StyledForm = styled.form`
  margin: 35px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
  width: 100%;
`;
