import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getFreelancerById, updateFreelancerById } from 'apiSdk/freelancers';
import { freelancerValidationSchema } from 'validationSchema/freelancers';
import { FreelancerInterface } from 'interfaces/freelancer';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function FreelancerEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<FreelancerInterface>(
    () => (id ? `/freelancers/${id}` : null),
    () => getFreelancerById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: FreelancerInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateFreelancerById(id, values);
      mutate(updated);
      resetForm();
      router.push('/freelancers');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<FreelancerInterface>({
    initialValues: data,
    validationSchema: freelancerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Freelancers',
              link: '/freelancers',
            },
            {
              label: 'Update Freelancer',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Freelancer
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.skills}
            label={'Skills'}
            props={{
              name: 'skills',
              placeholder: 'Skills',
              value: formik.values?.skills,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.experience}
            label={'Experience'}
            props={{
              name: 'experience',
              placeholder: 'Experience',
              value: formik.values?.experience,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.availability}
            label={'Availability'}
            props={{
              name: 'availability',
              placeholder: 'Availability',
              value: formik.values?.availability,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/freelancers')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'freelancer',
    operation: AccessOperationEnum.UPDATE,
  }),
)(FreelancerEditPage);
