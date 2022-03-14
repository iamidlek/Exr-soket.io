import styled from 'styled-components';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';
import Feed from '../../components/Feed';

const Home = () => {
  return (
    <>
      <Topbar />
      <HomeContainer>
        <Sidebar />
        <Feed />
      </HomeContainer>
    </>
  );
};

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
`;

export default Home;
