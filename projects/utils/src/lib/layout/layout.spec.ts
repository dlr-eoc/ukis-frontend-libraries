import { Paper } from "./layout";


describe('Paper test suide', () => {
    it('Paper should properly calculate pixel sizes', () => {

        const paper = new Paper('A3', 72, 'landscape');

        expect(paper.heightPx).toEqual(841);
        expect(paper.widthPx).toEqual(1190);

        const newPaper = paper.updateFormat('A0');

        expect(newPaper.heightPx).toEqual(2383);
        expect(newPaper.widthPx).toEqual(3370);
    });
});