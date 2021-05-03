import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    AdaptivityProvider,
    Appearance,
    AppRoot,
    Avatar,
    ConfigProvider,
    Div,
    FixedLayout,
    FormItem,
    FormLayout,
    FormLayoutGroup,
    Group,
    Input,
    Panel,
    PanelHeader,
    PanelHeaderContent,
    PromoBanner,
    Scheme,
    Separator,
    View
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import ServiceIcon from './img/icon.svg';
import Developers from "./components/Developers";
import {isNumber} from "@vkontakte/vkjs";

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
        });
        if (bridge.supports("VKWebAppGetAds"))
            bridge.send("VKWebAppGetAds").then(data => setAdvertisement(data))
    }, []);

    const onSeparateGradesChange = (val, t) => {
        if (!isNumber(val) && !val)
            return false
        val = parseInt(val) > 100 ? 100 : parseInt(val)
        setGrades(grades.filter(x => x !== t).concat(new Array(val).fill(t)).sort())
    }

    const onAllGradesChange = (e) => {
        let temp = e.target.value.replace(/[^1-5]/g, "").split("").map(v => parseInt(v)).sort()
        let countOf1 = temp.filter(x => x === 1).length
        let countOf2 = temp.filter(x => x === 2).length
        let countOf3 = temp.filter(x => x === 3).length
        let countOf4 = temp.filter(x => x === 4).length
        let countOf5 = temp.filter(x => x === 5).length
        if (countOf1 > 100)
            countOf1 = 100
        if (countOf2 > 100)
            countOf2 = 100
        if (countOf3 > 100)
            countOf3 = 100
        if (countOf4 > 100)
            countOf4 = 100
        if (countOf5 > 100)
            countOf5 = 100

        setGrades([]
            .concat(new Array(countOf1).fill(1))
            .concat(new Array(countOf2).fill(2))
            .concat(new Array(countOf3).fill(3))
            .concat(new Array(countOf4).fill(4))
            .concat(new Array(countOf5).fill(5))
        )
    }

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

    const canbeGradesCount = (t) => {
        if (grades.length <= 0)
            return "Невозможно рассчитать"
        const tempGrades = [...grades];
        let req = 0;
        while (tempGrades.reduce((a, b) => a + b, 0) / tempGrades.length >= required) {
            tempGrades.push(t)
            req++
            if (req > 100)
                return ">100"
        }
        return req
    }

    const requiredGradesCountStatus = (result) =>
        result === ">100" || isNumber(result) && result !== 0 ? "error" : result === 0 ? "valid" : "default"

    const canbeGradesCountStatus = (result) =>
        result === ">100" || isNumber(result) && result !== 0 ? "valid" : result === 0 ? "error" : "default"


    const requiredRestrictions = (e) => {
        let val = parseFloat(e.target.value)
        if (val > 5)
            val = 5
        else if (val < 1)
            val = 1
        return val
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
                                            <Input onChange={onAllGradesChange} inputMode="numeric"
                                                   value={grades.join(" ")}
                                                   placeholder="Введите здесь оценки"/>
                                        </FormItem>
                                        <FormLayoutGroup mode="horizontal">
                                            <FormItem top="Колы">
                                                <Input type="number" value={grades.filter(x => x === 1).length}
                                                       onChange={(e) => onSeparateGradesChange(e.target.value, 1)}
                                                       min={0}
                                                       max={100}/>
                                            </FormItem>
                                            <FormItem top="Двойки">
                                                <Input type="number" value={grades.filter(x => x === 2).length}
                                                       onChange={(e) => onSeparateGradesChange(e.target.value, 2)}
                                                       min={0}
                                                       max={100}/>
                                            </FormItem>
                                        </FormLayoutGroup>
                                        <FormLayoutGroup mode="horizontal">
                                            <FormItem top="Тройки">
                                                <Input type="number" value={grades.filter(x => x === 3).length}
                                                       onChange={(e) => onSeparateGradesChange(e.target.value, 3)}
                                                       min={0}
                                                       max={100}/>
                                            </FormItem>
                                            <FormItem top="Четвёрки">
                                                <Input type="number" value={grades.filter(x => x === 4).length}
                                                       onChange={(e) => onSeparateGradesChange(e.target.value, 4)}
                                                       min={0}
                                                       max={100}/>
                                            </FormItem>
                                            <FormItem top="Пятёрки">
                                                <Input type="number" value={grades.filter(x => x === 5).length}
                                                       onChange={(e) => onSeparateGradesChange(e.target.value, 5)}
                                                       min={0}
                                                       max={100}/>
                                            </FormItem>
                                        </FormLayoutGroup>

                                        <FormLayoutGroup mode="horizontal">
                                            <FormItem top="Рассчитанный балл">
                                                <Input readOnly
                                                       value={toGrade(grades.reduce((p, c) => p + c, 0) / grades.length)}/>
                                            </FormItem>
                                            <FormItem top="Требуемый балл">
                                                <Input type="number" min={1} max={5} step={0.1} inputMode="decimal"
                                                       value={required}
                                                       onBlur={(e) => {
                                                           const val = requiredRestrictions(e)
                                                           e.target.value = toGrade(val)
                                                           setRequired(val)
                                                       }}
                                                       onChange={(e) => setRequired(requiredRestrictions(e))}
                                                       placeholder="Введите здесь нужный балл"/>
                                            </FormItem>
                                        </FormLayoutGroup>
                                        {grades.reduce((p, c) => p + c, 0) / grades.length < required &&
                                        <FormLayoutGroup mode="horizontal">
                                            <FormItem status={requiredGradesCountStatus(requiredGradesCount(4))}
                                                      top="Необходимо четвёрок">
                                                <Input readOnly value={requiredGradesCount(4)}/>
                                            </FormItem>
                                            <FormItem status={requiredGradesCountStatus(requiredGradesCount(5))}
                                                      top="Необходимо пятёрок">
                                                <Input readOnly value={requiredGradesCount(5)}/>
                                            </FormItem>
                                        </FormLayoutGroup>
                                        }
                                        {grades.reduce((p, c) => p + c, 0) / grades.length >= required &&
                                        <FormLayoutGroup mode="horizontal">
                                            <FormItem status={canbeGradesCountStatus(canbeGradesCount(2) - 1)}
                                                      top="Можно получить двоек">
                                                <Input readOnly value={canbeGradesCount(2) - 1}/>
                                            </FormItem>
                                            <FormItem status={canbeGradesCountStatus(canbeGradesCount(3) - 1)}
                                                      top="Можно получить троек">
                                                <Input readOnly value={canbeGradesCount(3) - 1}/>
                                            </FormItem>
                                        </FormLayoutGroup>
                                        }
                                    </FormLayout>
                                    {/*<Banner
                                        before={<Icon28FavoriteCircleFillYellow/>}
                                        header="Добавь в избранное"
                                        subheader={
                                            <React.Fragment>
                                                Чтобы не потерять такое удобное приложение &mdash; можно добавить его в
                                                избранное!
                                            </React.Fragment>
                                        }
                                        actions={<Button
                                            onClick={() => bridge.send("VKWebAppAddToFavorites").then(data => console.log(data))}
                                            before={<Icon24FavoriteOutline/>}>Добавить в
                                            избранное</Button>}
                                    />*/}
                                    <Separator wide style={{marginTop: 16, marginBottom: 8}}/>
                                    <Developers/>
                                </Div>
                                {advertisement !== null && <FixedLayout vertical="bottom">
                                    <PromoBanner bannerData={advertisement}
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

