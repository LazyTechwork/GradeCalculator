import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    AdaptivityProvider,
    Appearance,
    AppRoot,
    Avatar,
    Banner,
    Button,
    ConfigProvider,
    Div,
    FormItem,
    FormLayout,
    FormLayoutGroup,
    Header,
    Input,
    Panel,
    PanelHeader,
    PanelHeaderContent,
    Scheme,
    Separator,
    View
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import ServiceIcon from './img/icon.svg';
import {Icon24FavoriteOutline, Icon24MessageOutline} from '@vkontakte/icons';

const App = () => {
    const [appearance, setAppearance] = useState(Appearance.LIGHT);
    const [scheme, setScheme] = useState(Scheme.BRIGHT_LIGHT);
    const [grades, setGrades] = useState([]);
    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                setAppearance(data.appearance || Appearance.LIGHT)
                setScheme(data.scheme || Scheme.BRIGHT_LIGHT)
            }
        });
    }, []);

    const onAllGradesChange = (e) =>
        setGrades(e.target.value.replace(/[^1-5]/g, "").split("").map(v => parseInt(v)).sort())


    const onSeparateGradesChange = (val, t) =>
        setGrades(grades.filter(x => x !== t).concat(new Array(parseInt(val)).fill(t)).sort())

    const toGrade = (num) => num ? num.toFixed(2) : "Невозможно рассчитать";

    return (
        <ConfigProvider appearance={appearance} scheme={scheme}>
            <AdaptivityProvider>
                <AppRoot>
                    <View activePanel="home">
                        <Panel id="home">
                            <Div>
                                <PanelHeader>
                                    <PanelHeaderContent
                                        before={<Avatar size={36} mode={'app'} src={ServiceIcon}/>}
                                    >
                                        Подсчёт оценок
                                    </PanelHeaderContent>
                                </PanelHeader>
                                <FormLayout>
                                    <FormItem top="Оценки">
                                        <Input onChange={onAllGradesChange} value={grades.join(" ")}
                                               placeholder="Введите здесь оценки"/>
                                    </FormItem>
                                    <FormLayoutGroup mode="horizontal">
                                        <FormItem top="Колы">
                                            <Input type="number" value={grades.filter(x => x === 1).length}
                                                   onChange={(e) => onSeparateGradesChange(e.target.value, 1)} min={0}
                                                   max={500}/>
                                        </FormItem>
                                        <FormItem top="Двойки">
                                            <Input type="number" value={grades.filter(x => x === 2).length}
                                                   onChange={(e) => onSeparateGradesChange(e.target.value, 2)} min={0}
                                                   max={500}/>
                                        </FormItem>
                                        <FormItem top="Тройки">
                                            <Input type="number" value={grades.filter(x => x === 3).length}
                                                   onChange={(e) => onSeparateGradesChange(e.target.value, 3)} min={0}
                                                   max={500}/>
                                        </FormItem>
                                        <FormItem top="Четвёрки">
                                            <Input type="number" value={grades.filter(x => x === 4).length}
                                                   onChange={(e) => onSeparateGradesChange(e.target.value, 4)} min={0}
                                                   max={500}/>
                                        </FormItem>
                                        <FormItem top="Пятёрки">
                                            <Input type="number" value={grades.filter(x => x === 5).length}
                                                   onChange={(e) => onSeparateGradesChange(e.target.value, 5)} min={0}
                                                   max={500}/>
                                        </FormItem>
                                    </FormLayoutGroup>

                                    <FormLayoutGroup mode="horizontal">
                                        <FormItem top="Рассчитанный балл">
                                            <Input readOnly
                                                   value={toGrade(grades.reduce((p, c) => p + c, 0) / grades.length)}/>
                                        </FormItem>
                                        <FormItem top="Требуемый балл">
                                            <Input type="number" min={1} max={5} step={0.1} defaultValue={4.5}
                                                   placeholder="Введите здесь нужный балл"/>
                                        </FormItem>
                                    </FormLayoutGroup>
                                    <FormLayoutGroup mode="horizontal">
                                        <FormItem top="Необходимо четвёрок">
                                            <Input readOnly value={"5"}/>
                                        </FormItem>
                                        <FormItem top="Необходимо пятёрок">
                                            <Input readOnly value={"8"}/>
                                        </FormItem>
                                    </FormLayoutGroup>
                                </FormLayout>
                                <Separator wide style={{marginTop: 16, marginBottom: 8}}/>
                                <Header>Разработчики</Header>
                                <Banner
                                    before={<Avatar size={96} mode="image"
                                                    src="https://sun1-95.userapi.com/s/v1/ig2/PdhJ0tQePfaEed-XUUpfysiQbL69Qd3OP97eyenSj_QC7n5HcOB6_qjOZVr4KppPVagSFabgCeQDKNe5XwQ7IrvY.jpg?size=200x0&quality=96&crop=0,0,2160,2160&ava=1"/>}
                                    header="ФРИИС"
                                    subheader="Фонд развития информационных и интеллектуальных систем"
                                    actions={<Button before={<Icon24FavoriteOutline/>}>Подписаться</Button>}
                                />
                                <Banner
                                    before={<Avatar size={96} mode="image"
                                                    src="https://sun1-17.userapi.com/s/v1/ig2/k8gq8e-VsnNptU4cZ2m2xLFVQd1QRtl1B9P_duk2G0W0hVp5yGbTB7Goq7-Pe3OG4-3SYNh9kqQBWsYZ3Dp1DKHP.jpg?size=200x0&quality=96&crop=392,66,1136,1136&ava=1"/>}
                                    header="Петров Иван"
                                    subheader="Разработчик"
                                    actions={<Button before={<Icon24MessageOutline/>}>Написать</Button>}
                                />
                            </Div>
                        </Panel>
                    </View>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default App;

