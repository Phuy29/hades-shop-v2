import * as z from 'zod';
import { Form, InputField } from '../../components/Form';
import { Button } from '../../components/Button';

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
  return (
    <div className="mt-32 m-auto max-w-xl">
      <Form<RegisterValues, typeof schema>
        schema={schema}
        onSubmit={async (values) => {
          console.log('values register', values);
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
