import { Form } from 'components/Form';
import * as z from 'zod';

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
    <div>
      <Form<LoginValues, typeof schema>
        schema={schema}
        onSubmit={async (values) => {
          console.log('values login', values);
        }}>
        {({ register, formState }) => {
          return <></>;
        }}
      </Form>
    </div>
  );
};

export default Login;
