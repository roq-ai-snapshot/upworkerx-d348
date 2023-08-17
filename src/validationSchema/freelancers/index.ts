import * as yup from 'yup';

export const freelancerValidationSchema = yup.object().shape({
  skills: yup.string().required(),
  experience: yup.string().required(),
  availability: yup.string().required(),
  user_id: yup.string().nullable(),
});
