'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Button from '@/components/common/Button';

interface ITest {
  username: string;
  password: string;
  confirmPassword: string;
  test?: string;
}

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: '오류 메시지 메세지',
    }),
    test: z.string().optional(),
    password: z
      .string()
      .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다' })
      .max(16, '비밀번호는 16자리 이하이어야 합니다'),
    // .regex(/[a-zA-Z]/, { message: '문자를 포함해야 합니다' })
    // .regex(/\d/, { message: '숫자를 포함해야 합니다' }),
    confirmPassword: z
      .string()
      .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다' })
      .max(100, '비밀번호는 100자리 이하이어야 합니다'),
    // .regex(/[a-zA-Z]/, { message: '문자를 포함해야 합니다' })
    // .regex(/\d/, { message: '숫자를 포함해야 합니다' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

const ProfileForm = () => {
  const form = useForm<ITest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: 'test',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <div>
      <h1>FORM</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            (data) => {
              // 성공 시 동작
              console.log('성공:', data);
            },
            (errors) => {
              // 에러 시 동작 (폼 제출 멈춤)
              console.log('에러 발생:', errors);
            }
          )}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState }) => {
              const { value, onChange } = field;
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <input
                      placeholder="shadcn"
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>
                  {fieldState.error ? 'error' : 'success'}
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/*  */}
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => {
              const { value, onChange } = field;
              return (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <input
                      placeholder="password"
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          {/*  */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => {
              const { value, onChange } = field;
              return (
                <FormItem>
                  <FormLabel>confirmPassword</FormLabel>
                  <FormControl>
                    <input
                      placeholder="confirmPassword"
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          {form.formState.errors.username
            ? form.formState.errors.username.message
            : 'success'}
          {form.formState.errors.confirmPassword
            ? form.formState.errors.confirmPassword.message
            : ''}
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <Button
        onClick={() => {
          form.reset({
            username: 'reset username',
            password: '',
            confirmPassword: '',
          });
        }}
      >
        Reset Button
      </Button>
    </div>
  );
};

export default ProfileForm;
