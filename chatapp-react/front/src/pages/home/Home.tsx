import styled from 'styled-components';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';

const Home = () => {
  return (
    <>
      <Topbar />
      <HomeContainer>
        <Sidebar />
      </HomeContainer>
    </>
  );
};

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
`;

export default Home;
