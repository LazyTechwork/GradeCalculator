import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    AdaptivityProvider,
    Appearance,
    AppRoot,
    Avatar, Button,
    ConfigProvider,
    Div, FixedLayout,
    FormItem,
    FormLayout,
    FormLayoutGroup, Group,
    Input,
    Panel,
    PanelHeader,
    PanelHeaderContent, PromoBanner,
    Scheme,
    Separator,
    View
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import ServiceIcon from './img/icon.svg';
import Developers from "./components/Developers";

const App = () => {
    const [appearance, setAppearance] = useState(Appearance.LIGHT);
    const [scheme, setScheme] = useState(Scheme.BRIGHT_LIGHT);
    const [grades, setGrades] = useState([]);
    const [required, setRequired] = useState(3.5);
    const [advertisement, setAdvertisement] = useState(null);
    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                setAppearance(data.appearance || Appearance.LIGHT)
                setScheme(data.scheme || Scheme.BRIGHT_LIGHT)
            }
            console.log(type, data);
        });
        if (bridge.supports("VKWebAppGetAds"))
            bridge.send("VKWebAppGetAds").then(data => setAdvertisement(data))
    }, []);

    const onAllGradesChange = (e) =>
        setGrades(e.target.value.replace(/[^1-5]/g, "").split("").map(v => parseInt(v)).sort())


    const onSeparateGradesChange = (val, t) =>
        setGrades(grades.filter(x => x !== t).concat(new Array(parseInt(val)).fill(t)).sort())

    const toGrade = (num) => num ? num.toFixed(2) : "Невозможно рассчитать";

    const requiredGradesCount = (t) => {
        if (grades.length <= 0)
            return "Невозможно рассчитать"
        const tempGrades = [...grades];
        let req = 0;
        while (tempGrades.reduce((a, b) => a + b, 0) / tempGrades.length < required) {
            tempGrades.push(t)
            req++
            if (req > 100)
                return ">100"
        }
        return req
    }

    return (
        <ConfigProvider appearance={appearance} scheme={scheme}>
            <AdaptivityProvider>
                <AppRoot>
                    <View activePanel="home">
                        <Panel id="home">
                            <PanelHeader separator={false}>
                                <PanelHeaderContent
                                    before={<Avatar size={36} mode={'app'} src={ServiceIcon}/>}
                                >
                                    Подсчёт оценок
                                </PanelHeaderContent>
                            </PanelHeader>
                            <Group>
                                <Div style={{paddingBottom: 128}}>
                                    <FormLayout>
                                        <FormItem top="Оценки">
                                            <Input onChange={onAllGradesChange} inputmode="numeric"
                                                   value={grades.join(" ")}
                                                   placeholder="Введите здесь оценки"/>
                                        </FormItem>
                                        <FormLayoutGroup mode="horizontal">
                                            <FormItem top="Колы">
                                                <Input type="number" value={grades.filter(x => x === 1).length}
                                                       onChange={(e) => onSeparateGradesChange(e.target.value, 1)}
                                                       min={0}
                                                       max={500}/>
                                            </FormItem>
                                            <FormItem top="Двойки">
                                                <Input type="number" value={grades.filter(x => x === 2).length}
                                                       onChange={(e) => onSeparateGradesChange(e.target.value, 2)}
                                                       min={0}
                                                       max={500}/>
                                            </FormItem>
                                        </FormLayoutGroup>
                                        <FormLayoutGroup mode="horizontal">
                                            <FormItem top="Тройки">
                                                <Input type="number" value={grades.filter(x => x === 3).length}
                                                       onChange={(e) => onSeparateGradesChange(e.target.value, 3)}
                                                       min={0}
                                                       max={500}/>
                                            </FormItem>
                                            <FormItem top="Четвёрки">
                                                <Input type="number" value={grades.filter(x => x === 4).length}
                                                       onChange={(e) => onSeparateGradesChange(e.target.value, 4)}
                                                       min={0}
                                                       max={500}/>
                                            </FormItem>
                                            <FormItem top="Пятёрки">
                                                <Input type="number" value={grades.filter(x => x === 5).length}
                                                       onChange={(e) => onSeparateGradesChange(e.target.value, 5)}
                                                       min={0}
                                                       max={500}/>
                                            </FormItem>
                                        </FormLayoutGroup>

                                        <FormLayoutGroup mode="horizontal">
                                            <FormItem top="Рассчитанный балл">
                                                <Input readOnly
                                                       value={toGrade(grades.reduce((p, c) => p + c, 0) / grades.length)}/>
                                            </FormItem>
                                            <FormItem top="Требуемый балл">
                                                <Input type="number" min={1} max={5} step={0.1} inputmode="decimal"
                                                       value={required}
                                                       onBlur={(e) => {
                                                           e.target.value = toGrade(parseFloat(e.target.value))
                                                           setRequired(parseFloat(e.target.value))
                                                       }}
                                                       onChange={(e) => setRequired(parseFloat(e.target.value))}
                                                       placeholder="Введите здесь нужный балл"/>
                                            </FormItem>
                                        </FormLayoutGroup>
                                        <FormLayoutGroup mode="horizontal">
                                            <FormItem top="Необходимо четвёрок">
                                                <Input readOnly value={requiredGradesCount(4)}/>
                                            </FormItem>
                                            <FormItem top="Необходимо пятёрок">
                                                <Input readOnly value={requiredGradesCount(5)}/>
                                            </FormItem>
                                        </FormLayoutGroup>
                                    </FormLayout>
                                    <Separator wide style={{marginTop: 16, marginBottom: 8}}/>
                                    <Developers/>
                                </Div>
                                {advertisement !== null && <FixedLayout vertical="bottom">
                                    <PromoBanner bannerData={advertisement} isCloseButtonHidden
                                                 onClose={() => setAdvertisement(null)}/>
                                </FixedLayout>}
                            </Group>
                        </Panel>
                    </View>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default App;

