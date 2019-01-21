import styled from "styled-components";
import {subtleBoxShadow, lightBlueBackground, greenBoxShadow, redBoxShadow} from "../Shared/Styles";

export const Tile = styled.div`
    ${subtleBoxShadow}
    ${lightBlueBackground}
    padding: 10px;
`;

export const SelectableTile = styled(Tile)`
    &:hover {
        cursor: pointer;
        ${greenBoxShadow}
    }
`;
export const DeleteableTile = styled(SelectableTile)`
    &:hover {
        cursor: pointer;
        ${redBoxShadow}
    }
`;
export const DisabledTile = styled(Tile)`
    &:hover {
        pointer-events:none;
        opacity: 0.4;
    }
`;