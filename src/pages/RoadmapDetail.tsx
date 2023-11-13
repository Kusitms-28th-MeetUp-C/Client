import MoreItems from '../components/SearchDetail/MoreItems';
import Info from '../components/SearchDetail/Info';
import Agenda from '../components/SearchDetail/Agenda';
import LinkedRoadmap from '../components/SearchDetail/LinkedRoadmap';
import Maker from '../components/SearchDetail/Maker';
import Modal from '../components/Modal/Modal';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdExpandMore } from 'react-icons/md';
import UseBtn from '../components/SearchDetail/UseBtn';
import Axios from '../assets/api';
import { UserData, RoadmapMainData } from '../interfaces/TemplateDetail';
import Process from '../components/SearchDetail/Process';
import BackBtn from '../components/SearchDetail/BackBtn';
import Title from '../components/Common/Title';

const RoadmapDetail = () => {
  const navigate = useNavigate();
  const { roadmapId } = useParams();
  const [mainData, setMainData] = useState<any>({});
  const [processData, setProcessData] = useState<any>({});
  const [infoData, setInfoData] = useState<any>({});
  const [roadmapData, setRoadmapData] = useState<any>([]);
  const [userData, setUserData] = useState<any>({});

  const fetchData = async () => {
    await Axios.get('roadmap/detail', {
      params: {
        roadmapId,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        const response = res.data.data;
        setMainData({ title: response.title });
        setInfoData({ ...response.roadmapIntro });
        setProcessData({ ...response.roadmapData });
        setRoadmapData([...response.relatedRoadmap]);
        setUserData({ ...response.user });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, [roadmapId]);

  const teamData = [
    '조직행위론 c팀',
    'IT 해커톤 8조',
    '연합동아리 큐시즘',
    '비밀프로젝트 a팀',
  ];

  const [isOpenTeamModal, setIsOpenTeamModal] = useState(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [isOpenCmbBox, setIsOpenCmbBox] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('선택');

  const onSubmitTeamModal = () => {
    setIsOpenTeamModal(false);
    setIsOpenAlertModal(true);
  };

  const onSubmitAlertModal = () => {
    setIsOpenAlertModal(false);
    navigate('/my-items');
  };

  const onClickUseBtn = () => {
    setIsOpenTeamModal(true);
  };

  return (
    <div className="w-[1250px] px-10 py-9">
      <BackBtn>전체 로드맵 보기</BackBtn>

      <Title>{mainData.title}</Title>

      <div className="flex justify-between">
        <div className="flex w-[74.5%] flex-col gap-7">
          <Process data={processData} />
          <div className="flex justify-between">
            <div className="w-[29.53%]">
              <Info isRoadmap data={infoData} />
            </div>
            <div className="w-[65.77%]">
              <MoreItems isRoadmap data={roadmapData} />
            </div>
          </div>
        </div>
        <div className="w-[22%]">
          <UseBtn onClickBtn={onClickUseBtn}>로드맵 사용하기</UseBtn>
          <Maker data={userData} />
        </div>
      </div>
      {isOpenTeamModal && (
        <Modal
          title="사용할 팀을 골라주세요"
          cancel="닫기"
          submit="적용하기"
          setIsOpen={setIsOpenTeamModal}
          onSubmit={onSubmitTeamModal}
        >
          <div className="relative w-full">
            <div
              className={`flex cursor-pointer items-center justify-between rounded-[10px] bg-[#ECEBFE] px-7 py-3 duration-300 ${
                isOpenCmbBox ? 'bg-blue4' : ''
              }`}
              onClick={() => setIsOpenCmbBox((prev) => !prev)}
            >
              <div className="text-base font-bold text-gray2">
                {selectedTeam}
              </div>
              <MdExpandMore className="h-8 w-8 text-blue1" />
            </div>
            {isOpenCmbBox && (
              <div className="absolute flex w-full flex-col rounded-[10px] bg-blue5">
                {teamData.map((el, idx) => (
                  <div
                    className="cursor-pointer overflow-hidden px-7 py-3 text-base font-medium text-gray2 duration-300 hover:rounded-[10px] hover:bg-blue4"
                    key={idx}
                    onClick={() => {
                      setSelectedTeam(el);
                      setIsOpenCmbBox((prev) => !prev);
                    }}
                  >
                    {el}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}
      {isOpenAlertModal && (
        <Modal
          title="로드맵을 저장했어요!"
          cancel="계속 둘러보기"
          submit="사용하러 가기"
          setIsOpen={setIsOpenAlertModal}
          onSubmit={onSubmitAlertModal}
        />
      )}
    </div>
  );
};

export default RoadmapDetail;
