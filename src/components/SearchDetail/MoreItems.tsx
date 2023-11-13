import { BiSolidTimeFive } from 'react-icons/bi';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdExpandMore } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface MoreItemsProps {
  isRoadmap?: boolean;
}

const MoreItems = ({ isRoadmap }: MoreItemsProps) => {
  const data = [
    {
      title: '플로우 설계 회의 템플릿',
      team: '66',
      time: '60',
      rate: '9.0',
      tag: '기획-디자인-개발 프로젝트 로드맵',
      steps: '7',
    },
    {
      title: '아이디어 발제 회의 템플릿',
      team: '38',
      time: '40',
      rate: '9.5',
      tag: '기획-디자인-개발 프로젝트 로드맵',
      steps: '10',
    },
    {
      title: '기획-디자인-개발 백로그 템플릿',
      team: '95',
      time: '40',
      rate: '9.5',
      tag: '기획-디자인-개발 프로젝트 로드맵',
      steps: '7',
    },
    {
      title: '데스크 리서치 템플릿',
      team: '38',
      time: '30',
      rate: '9.0',
      tag: '기획-디자인-개발 프로젝트 로드맵',
      steps: '5',
    },
  ];

  return (
    <div className="rounded-[20px] bg-white px-8 py-8">
      <div className="mb-[30px] text-xl font-bold text-black">
        {isRoadmap
          ? 'IT프로젝트 다른 로드맵 모아보기'
          : 'IT프로젝트 다른 템플릿 모아보기'}
      </div>
      <div className="flex flex-wrap justify-between gap-4">
        {data.map((el, idx) => (
          <Link
            to="/"
            className="w-[48%] rounded-[20px] bg-[#EBEEF9] p-5"
            key={idx}
          >
            <div className="flex items-center justify-between">
              <div className="text-gray2 text-sm font-bold">{el.title}</div>
              <MdExpandMore className="text-gray4" />
            </div>
            <div
              className={`my-4 flex items-center ${
                isRoadmap ? 'gap-4' : 'justify-between'
              }`}
            >
              <div className="flex items-center gap-1">
                <FaPeopleGroup className="text-tagSkyblue1" />
                <div className="text-gray3 text-xs font-semibold">
                  {el.team}팀 사용 중
                </div>
              </div>
              {!isRoadmap && (
                <div className="flex items-center gap-1">
                  <BiSolidTimeFive className="text-tagPurple1" />
                  <div className="text-gray3 text-xs font-semibold">
                    {el.time}m
                  </div>
                </div>
              )}
              <div className="flex items-center gap-1">
                <FaStar className="text-[#F8D20C]" />
                <div className="text-gray3 text-xs font-semibold">
                  {el.rate}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-white px-[11px] py-[3px]">
              {isRoadmap ? (
                <img src="/icons/stair-purple.svg" />
              ) : (
                <img src="/icons/category-purple.svg" />
              )}
              <div className="text-gray3 text-[10px] font-semibold">
                {isRoadmap ? `${el.steps} steps` : `${el.tag}`}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreItems;