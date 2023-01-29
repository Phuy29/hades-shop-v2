import { Form, InputField } from 'components/Form';
import * as z from 'zod';
import { Button } from '../../components/Button';

const schema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required')
});

type LoginValues = {
  username: string;
  password: string;
};

const Login = () => {
  return (
    <div className="mt-32 m-auto max-w-xl">
      <Form<LoginValues, typeof schema>
        schema={schema}
        onSubmit={async (values) => {
          console.log('values login', values);
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
