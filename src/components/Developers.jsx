import React from 'react';
import {Avatar, Banner, Button, Header} from "@vkontakte/vkui";
import {Icon24FavoriteOutline, Icon24MessageOutline} from "@vkontakte/icons";

const Developers = () => {
    return (<>
        <Header>Разработчики</Header>
        <Banner
            before={<Avatar size={96} mode="image"
                            src="https://sun1-95.userapi.com/s/v1/ig2/PdhJ0tQePfaEed-XUUpfysiQbL69Qd3OP97eyenSj_QC7n5HcOB6_qjOZVr4KppPVagSFabgCeQDKNe5XwQ7IrvY.jpg?size=200x0&quality=96&crop=0,0,2160,2160&ava=1"/>}
            header="ФРИИС"
            subheader="Фонд развития информационных и интеллектуальных систем"
            actions={<Button href={"//vk.com/iisdf"} before={<Icon24FavoriteOutline/>}>Подписаться</Button>}
        />
        <Banner
            before={<Avatar size={96} mode="image"
                            src="https://sun1-17.userapi.com/s/v1/ig2/k8gq8e-VsnNptU4cZ2m2xLFVQd1QRtl1B9P_duk2G0W0hVp5yGbTB7Goq7-Pe3OG4-3SYNh9kqQBWsYZ3Dp1DKHP.jpg?size=200x0&quality=96&crop=392,66,1136,1136&ava=1"/>}
            header="Петров Иван"
            subheader="Разработчик"
            actions={<Button href={"//vk.com/id242521347"} before={<Icon24MessageOutline/>}>Написать</Button>}
        />
    </>)
}

export default Developers;