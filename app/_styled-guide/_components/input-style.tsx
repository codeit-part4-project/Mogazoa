'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ImFilePicture } from 'react-icons/im';
import { PiEyeSlashLight, PiEyeThin } from 'react-icons/pi';
import { z } from 'zod';

const FormSchema = z.object({
  email: z.string(),
  password: z.string(),
  image: z.string(),
  nick: z.string().max(2, { message: '글자가 많아요' }),
  textarea: z.string().max(2, { message: '글자가 많아요' }),
});

export default function InputStyle() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nick: '',
      email: '',
      password: '',
      textarea: '',
    },
  });
  return (
    <div>
      <Form {...form}>
        <form className="mt-10">
          <div className="flex gap-[80px]">
            <div className="flex-1">
              {/* text */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage>{'에러메세지자리'}</FormMessage>
                  </FormItem>
                )}
              />
              <br />
              {/* text */}
              <FormField
                control={form.control}
                name="nick"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input placeholder="닉네임을 입력해 주세요" {...field} />
                    </FormControl>
                    <FormDescription>최소 8자 이상</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              {/* 이미지 추가 */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="order-3">
                    <div className="relative flex h-[140px] md:h-[135px] lg:h-[160px] w-[140px] md:w-[135px] lg:w-[160px]">
                      <FormControl>
                        <>
                          <Input id="picture" type="file" multiple accept="image/*" />
                          {/* label bg로 image 보이게*/}
                          <FormLabel
                            htmlFor="picture"
                            className={`absolute right-[1px] top-[1px] flex items-center justify-center cursor-pointer rounded-lg bg-[#252530] border border-[#353542] bg-center bg-no-repeat z-[1]`}
                            style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }}
                          >
                            {/* 삭제버튼 */}
                            {false ? (
                              <Button
                                type="button"
                                variant="icon"
                                size="auto"
                                className="absolute right-1 top-1 flex items-center justify-center h-7 w-7 rounded-lg bg-black/50 p-1"
                              ></Button>
                            ) : (
                              <span>
                                <ImFilePicture className="text-gray-600" size={34} />
                              </span>
                            )}
                          </FormLabel>
                        </>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <br />
          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={true ? 'password' : 'text'}
                      placeholder="비밀번호를 적어주세요"
                      {...field}
                    />
                    <Button asChild variant="icon" size="auto">
                      <span className="absolute top-2.5 md:top-5 right-5">
                        {true ? (
                          <PiEyeSlashLight size={22} className="hover:fill-[#ddd] text-gray-500" />
                        ) : (
                          <PiEyeThin size={22} className="hover:fill-[#ddd] " />
                        )}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          {/* text */}
          <FormField
            control={form.control}
            name="textarea"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Textarea placeholder="리뷰를 작성해 주세요" />
                </FormControl>
                <FormDescription className="absolute bottom-5 right-5 text-sm text-gray-600">
                  2/30
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <Button type="submit" className={'mt-10'}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
