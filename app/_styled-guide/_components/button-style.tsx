import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { MdShare } from 'react-icons/md';
import { IoMdAdd, IoMdClose, IoMdHeartEmpty } from 'react-icons/io';
import { RiKakaoTalkFill } from 'react-icons/ri';

export default function ButtonStyle() {
  return (
    <div className="">
      <hr />
      <div className="py-4">
        <Button>그라데이션 버튼</Button>
      </div>
      <div className="py-4">
        <Button variant="outline">variant:outline 버튼</Button>
      </div>
      <div className="py-4">
        <Button variant="outlineBlue" data-text="아웃라인버튼 텍스트 넣는위치">
          variant:outlineBlue 버튼
        </Button>
      </div>
      {/* 아이콘 버튼 */}
      <h3 className="text-[18px] font-bold text-white pt-8">아이콘 버튼</h3>
      <div className="flex gap-2 py-4">
        <Button asChild variant="iconBg" size="auto">
          <RiKakaoTalkFill color={'#9FA6B2'} size={18} />
        </Button>
        <Button asChild variant="iconBg" size="auto">
          <MdShare color={'#9FA6B2'} size={18} />
        </Button>
      </div>
      <div className="flex gap-2 py-4">
        <Button asChild variant="icon" size="auto">
          <IoMdHeartEmpty color={'#9FA6B2'} size={24} className="hover:fill-[#ddd]" />
        </Button>
        <Button asChild variant="icon" size="auto">
          <IoMdClose color={'#9FA6B2'} size={28} className="hover:fill-[#ddd]" />
        </Button>
      </div>
      <div className="py-4">
        <Button variant="circleBlue" size={'auto'} className="w-[60px] h-[60px]">
          <IoMdAdd color="white" size={30} />
        </Button>
      </div>
      {/* main nav / 팝업 버튼 */}
      <h3 className="text-[18px] font-bold text-white pt-8">main nav / 팝업 버튼</h3>
      <div className="flex justify-between py-4">
        <div className="flex flex-col w-[220px]">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'nav', size: 'sm' }),
              `${false ? 'border-[#353542] bg-[#252530] text-white' : ''}`,
            )}
          >
            회원가입
          </Link>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'nav', size: 'sm' }),
              `${false ? 'border-[#353542] bg-[#252530] text-white' : ''}`,
            )}
          >
            회원가입
          </Link>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'nav', size: 'sm' }),
              `${false ? 'border-[#353542] bg-[#252530] text-white' : ''}`,
            )}
          >
            회원가입
          </Link>
        </div>
        <div className="flex gap-5 flex-col w-[500px] py-4">
          <Button variant="outlineBlue" data-text="Air Pods1">
            variant:outlineBlue 버튼
          </Button>
          <Button variant="outlineRed">Air Pods2</Button>
          <Button className="mt-5">교체하기</Button>
        </div>
      </div>
      {/* 헤더 텍스트 버튼 */}
      <h3 className="text-[18px] font-bold text-white pt-8">헤더 텍스트 버튼</h3>
      <div className="flex gap-[60px] bg-black/70 py-4 my-4">
        <Link href="/" className={buttonVariants({ variant: 'text', size: 'auto' })}>
          로그인
        </Link>
        <Link href="/" className={buttonVariants({ variant: 'text', size: 'auto' })}>
          회원가입
        </Link>
      </div>
      {/* 프로필 탭 버튼 */}
      <h3 className="text-[18px] font-bold text-white pt-8">프로필 탭 버튼</h3>
      <div className="flex gap-5 bg-black/80 my-4">
        <Button variant="text" className={`text-gray-600 ${true && 'text-white'}`}>
          리뷰 남긴 상품
        </Button>
        <Button variant="text" className={`text-gray-600`}>
          등록한 상품
        </Button>
        <Button variant="text" className={`text-gray-600`}>
          찜한 상품
        </Button>
      </div>
    </div>
  );
}
