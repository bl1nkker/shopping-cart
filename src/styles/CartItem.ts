import styled from 'styled-components'

export const Wrapper = styled.div`
    display:flex;
    justify-content: space-between;
    border-bottom: 1px lightblue solid;
    padding-bottom: 20px;

    div{
        flex:1;
    }

    .item-info, .buttons{
        display: flex;
        justify-content: space-between;
    }

    img{
        max-width: 80px;
        object-fit: cover;
        margin-left: 40px;

    }
`;