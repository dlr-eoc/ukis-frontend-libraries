import { propsEqual, arrayMove, flattenDeepArray, clone, pick } from './utilities';

describe('Object Utils', () => {
    let testObject: any;
    let objTitle: any;
    let objChildTitle: any;
    let objChildArrayTitle;
    let objArrayTitle;
    let objArrayTitle2;

    beforeEach(() => {
        objTitle = 'Test title';
        objChildTitle = 'Child Test title';
        objChildArrayTitle = 'Child Array Test title';
        objArrayTitle = 'Test title in array';
        objArrayTitle2 = 'Test title 2 in array';

        testObject = {
            properties: {
                title: objTitle,
                child: {
                    title: objChildTitle,
                    array: [
                        {
                            title: objChildArrayTitle
                        }
                    ]
                },
                array: [
                    {
                        title: objArrayTitle
                    },
                    {
                        title: objArrayTitle2
                    }
                ]
            },
        };
    });

    it('shuld pick obj properties.title', () => {
        const test = pick(testObject, 'properties.title');
        expect(test).toBe(objTitle);
    });

    it('shuld pick obj properties.child.title', () => {
        const test = pick(testObject, 'properties.child.title');
        expect(test).toBe(objChildTitle);
    });

    it('shuld pick obj properties', () => {
        const test = pick(testObject, 'properties');
        expect(test).toBe(testObject.properties);
    });

    it('shuld pick obj properties[title]', () => {
        const test = pick(testObject, 'properties[title]');
        expect(test).toBe(objTitle);
    });

    it('shuld pick obj properties.array[0]', () => {
        const test = pick(testObject, 'properties.array[0]');
        expect(test).toBe(testObject.properties.array[0]);
    });

    it('shuld pick obj properties.array[1]', () => {
        const test = pick(testObject, 'properties.array[1]');
        expect(test).toBe(testObject.properties.array[1]);
    });

    it('shuld pick obj properties.array[0][title]', () => {
        const test = pick(testObject, 'properties.array[0][title]');
        expect(test).toBe(testObject.properties.array[0].title);
    });

    it('shuld pick obj properties.child.array[0][title]', () => {
        const test = pick(testObject, 'properties.child.array[0][title]');
        expect(test).toBe(testObject.properties.child.array[0].title);
    });

    it('shuld clone a object', () => {
        const a = {
            name: 'a',
            num: 1,
            numObj: new Number(1),
            date: new Date(),
            keys: ['a1', 'a2', 'a3'],
            child: {
                name: 'ac'
            }
        };

        const b = clone(a);
        expect(a).toEqual(b);
    });

    it('should compare tow objects', () => {
        const a = {
            name: 'a',
            num: 1,
            numObj: new Number(1),
            date: new Date(),
            keys: ['a1', 'a2', 'a3'],
            child: {
                name: 'ac'
            }
        };

        const a2 = {
            name: 'a',
            num: 1,
            numObj: new Number(1),
            date: new Date(),
            keys: ['a1', 'a2', 'a3'],
            child: {
                name: 'ac'
            }
        };

        const b = {
            name: 'b',
            num: 2,
            numObj: new Number(2),
            keys: ['b1', 'b2', 'b3'],
            child: {
                name: 'bc'
            }
        };

        const se_aa = propsEqual(a, a);
        expect(se_aa).toBeTrue();

        const se_aa2 = propsEqual(a, a2);
        expect(se_aa2).toBeTrue();

        const ac = clone(a);
        const se_aac = propsEqual(a, ac);
        expect(se_aac).toBeTrue();

        const acm = clone(a);
        acm.name = 'acm';
        const se_aacm = propsEqual(a, acm);
        expect(se_aacm).toBeFalse();

        const se_ab = propsEqual(a, b);
        expect(se_ab).toBeFalse();


        const d = clone(a);
        d.child.name = 'd';
        const se_ad = propsEqual(a, d);
        expect(se_ad).toBeFalse();
    });
});


describe('Array Utils test suide', () => {
    it('should move a item in a array', () => {
        const a = [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'd' }];

        arrayMove(a, 0, 2);

        expect(a).toEqual([{ name: 'b' }, { name: 'c' }, { name: 'a' }, { name: 'd' }])
    });
});