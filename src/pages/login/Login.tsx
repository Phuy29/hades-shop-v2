import { Form, InputField } from 'components/Form';
import * as z from 'zod';
import { Button } from '../../components/Button';
import { login } from '../../api/auth/login';
import { useMutation } from 'react-query';
import { User } from '../../types/user';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage';

const schema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required')
});

type LoginValues = {
  username: string;
  password: string;
};

const Login = () => {
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const { mutateAsync: loginUser } = useMutation({
    mutationFn: (dataUser: Pick<User, 'username' | 'password'>) => login(dataUser),
    onSuccess: (data) => {
      storage.setToken(data.accessToken);
      setAuthData(data);
      navigate('/');
    }
  });

  return (
    <div className="mt-32 m-auto max-w-xl">
      <Form<LoginValues, typeof schema>
        schema={schema}
        onSubmit={async (values) => {
          await loginUser(values);
        }}>
        {({ register, formState }) => {
          return (
            <>
              <InputField
                type="text"
                label="Username"
                registration={register('username')}
                error={formState.errors['username']}
              />
              <InputField
                type="password"
                label="Password"
                registration={register('password')}
                error={formState.errors['password']}
              />
              <div>
                <Button type="submit" className="w-full">
                  Log in
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
};

export default Login;
