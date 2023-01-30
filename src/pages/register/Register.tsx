import * as z from 'zod';
import { Form, InputField } from '../../components/Form';
import { Button } from '../../components/Button';
import { useMutation } from 'react-query';
import { User } from '../../types/user';
import { register } from '../../api/auth/resgister';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  username: z.string().min(1, 'Required'),
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required')
});

type RegisterValues = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();

  const { mutateAsync: registerUser } = useMutation({
    mutationFn: (dataUser: Pick<User, 'username' | 'email' | 'password'>) => register(dataUser),
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      console.error(error);
    }
  });

  return (
    <div className="mt-32 m-auto max-w-xl">
      <Form<RegisterValues, typeof schema>
        schema={schema}
        onSubmit={async (values) => {
          await registerUser(values);
        }}>
        {({ register, formState }) => {
          return (
            <>
              <InputField
                type={'text'}
                label={'Username'}
                registration={register('username')}
                error={formState.errors['username']}
              />
              <InputField
                type={'email'}
                label={'Email'}
                registration={register('email')}
                error={formState.errors['email']}
              />
              <InputField
                type={'password'}
                label={'Password'}
                registration={register('password')}
                error={formState.errors['password']}
              />
              <div>
                <Button type={'submit'} className={'w-full'}>
                  Register
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
};

export default Register;
