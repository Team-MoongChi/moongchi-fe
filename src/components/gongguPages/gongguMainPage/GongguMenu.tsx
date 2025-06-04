import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
`;
const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16%;
  font-size: 12px;
`;
const MenuButton = styled.div`
  background-color: #5849d0;
  border-radius: 6px;
  width: 100%;
  aspect-ratio: 1/1;
`;

export default function GongguMenu() {
    return (
        <Menu>
        <MenuItem>
          <MenuButton></MenuButton>
          <div>전체</div>
        </MenuItem>
        <MenuItem>
          <MenuButton></MenuButton>
          <div>신선식품</div>
        </MenuItem>
        <MenuItem>
          <MenuButton></MenuButton>
          <div>가공식품</div>
        </MenuItem>
        <MenuItem>
          <MenuButton></MenuButton>
          <div>생활용품</div>
        </MenuItem>
        <MenuItem>
          <MenuButton></MenuButton>
          <div>주방용품</div>
        </MenuItem>
      </Menu>
    );
}