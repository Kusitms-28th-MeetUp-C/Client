import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import MoreItems from '../components/SearchDetail/MoreItems';
import Info from '../components/SearchDetail/Info';
import Agenda from '../components/SearchDetail/Agenda';
import LinkedRoadmap from '../components/SearchDetail/LinkedRoadmap';
import Maker from '../components/SearchDetail/Maker';
import UseBtn from '../components/SearchDetail/UseBtn';
import Axios from '../libs/api';
import Modal from '../components/Modal/Modal';
import Title from '../components/Common/Title';
import BackBtn from '../components/SearchDetail/BackBtn';

const TemplateDetail = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [mainData, setMainData] = useState<any>({});
  const [infoData, setInfoData] = useState<any>({});
  const [agendaData, setAgendaData] = useState('');
  const [templateData, setTemplateData] = useState<any>([]);
  const [roadmapData, setRoadmapData] = useState({});
  const [userData, setUserData] = useState<any>({});

  const onSubmitAlertModal = () => {
    setIsOpenAlertModal(false);
    navigate('/search-template');
  };

  const fetchData = async () => {
    await Axios.get('template/detail', {
      params: {
        templateId,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        const response = res.data.data;
        setMainData({ title: response.title });
        setInfoData({ ...response.templateIntro });
        setTemplateData([...response.relatedTemplate]);
        setAgendaData(response.templateContent);
        setRoadmapData({ ...response.roadmapIdAndConnectRoadmap });
        setUserData({ ...response.user });
      })
      .catch((err) => console.error(err));
  };

  const onClickUseBtn = async () => {
    await Axios.get('manage/template/save/user', {
      params: {
        templateId,
      },
    })
      .then((res) => {
        console.log(res);
        setIsOpenAlertModal(true);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, [templateId]);

  // 반응형
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 500;

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    // clean up 이벤트 리스너
    return () => {
      window.removeEventListener('resize', () =>
        setWindowWidth(window.innerWidth),
      );
    };
  }, []);

  return (
    <div
      className={`w-full ${
        isMobile ? 'px-6 py-6' : 'min-w-[1250px] px-10 py-9'
      }`}
    >
      <BackBtn isMobile={isMobile} />
      <Title isMobile={isMobile}>{mainData.title}</Title>

      {isMobile ? (
        <div className="mt-4 flex w-full flex-col">
          <UseBtn isMobile={isMobile} onClickBtn={onClickUseBtn}>
            템플릿 사용하기
          </UseBtn>
          <Info isMobile={isMobile} data={infoData} />
          <Agenda isMobile={isMobile} data={agendaData} />
          <LinkedRoadmap isMobile={isMobile} data={roadmapData} />
          <Maker isMobile={isMobile} data={userData} />
          <MoreItems isMobile={isMobile} data={templateData} />
        </div>
      ) : (
        <div className="mt-9 flex justify-between">
          <div className="w-[22%]">
            <Info data={infoData} />
          </div>
          <div className="w-[49%]">
            <Agenda data={agendaData} />
            <MoreItems data={templateData} />
          </div>
          <div className="w-[22%]">
            <UseBtn onClickBtn={onClickUseBtn}>템플릿 사용하기</UseBtn>
            <LinkedRoadmap data={roadmapData} />
            <Maker data={userData} />
          </div>
        </div>
      )}

      {/* 모달창 */}
      {isOpenAlertModal && (
        <Modal
          title="템플릿을 저장했어요!"
          cancel="계속 둘러보기"
          submit="사용하러 가기"
          setIsOpen={setIsOpenAlertModal}
          onSubmit={onSubmitAlertModal}
        />
      )}
    </div>
  );
};

export default TemplateDetail;
