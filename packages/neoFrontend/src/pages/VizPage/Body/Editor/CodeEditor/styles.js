import styled from 'styled-components';
import { Icon } from '../../styles';

export const Wrapper = styled.div`
  width: 500px;
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  position: relative;
`;

export const CodeEditorIcon = styled(Icon)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 10px 10px 10px;
`;
