import { trackerFactory } from './../test-helper';
import HttpPerformance from '@/models/http-performance';

describe('HttpPerformance Model', () => {
    it('has boot time', () => {
        let trackerSource = trackerFactory.create();
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.boot).to.equal('0.009');
    });

    it('has middleware time', () => {
        let trackerSource = trackerFactory.create();
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.middleware).to.equal('0.003');
    });

    it('has request time', () => {
        let trackerSource = trackerFactory.create();
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.request).to.equal('0.101');
    });

    it('has response time', () => {
        let trackerSource = trackerFactory.create();
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.response).to.equal('0.002');
    });

    it('has total request if middleware is missing', () => {
        let trackerSource = trackerFactory.create('data.performance.timer', {
            laravel: 350,
            boot: 9.1234567,
            middleware: 3.448009490966797,
            request: 101.3669586181641,
            response: 2.4479793548583984,
            'total-request': 110,
        });
        delete trackerSource.data.performance.timer.middleware;
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.hasOwnProperty('middleware')).to.be.false;
        expect(performance.summary.request).to.equal('0.110');
    });

    it('has total request if request is missing', () => {
        let trackerSource = trackerFactory.create('data.performance.timer', {
            laravel: 350,
            boot: 9.1234567,
            middleware: 3.448009490966797,
            request: 101.3669586181641,
            response: 2.4479793548583984,
            'total-request': 110,
        });
        delete trackerSource.data.performance.timer.request;
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.hasOwnProperty('middleware')).to.be.false;
        expect(performance.summary.request).to.equal('0.110');
    });

    it('has time of other actions', () => {
        let trackerSource = trackerFactory.create('data.performance', { timer: {
            laravel: 1026,
            boot: 2,
            middleware: 3,
            request: 1012,
            response: 2,
            'total-request': 500,
        }});
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.other).to.equal('0.007');
    });

    it('has related summary chart data with summary table data', () => {
        let trackerSource = trackerFactory.create();
        let performance = new HttpPerformance(trackerSource.data.performance);

        let summaryTable = performance.summaryTableData();
        let summaryChart = performance.summaryChartData();

        expect(summaryChart.labels.length).to.equal(5);
        expect(summaryChart.labels.length).to.equal(summaryTable.length);

        expect(summaryChart.labels[0]).to.equal(summaryTable[0].label);
        expect(summaryChart.labels[1]).to.equal(summaryTable[1].label);
        expect(summaryChart.labels[2]).to.equal(summaryTable[2].label);
        expect(summaryChart.labels[3]).to.equal(summaryTable[3].label);
        expect(summaryChart.labels[4]).to.equal(summaryTable[4].label);

        expect(summaryChart.datasets[0].data.length).to.equal(5);
        expect(summaryChart.datasets[0].data).to.deep.equal(Object.values(performance.summary));

        expect(summaryChart.datasets[0].backgroundColor.length).to.equal(5);
        expect(summaryChart.datasets[0].backgroundColor[0]).to.equal(summaryTable[0].color);
        expect(summaryChart.datasets[0].backgroundColor[1]).to.equal(summaryTable[1].color);
        expect(summaryChart.datasets[0].backgroundColor[2]).to.equal(summaryTable[2].color);
        expect(summaryChart.datasets[0].backgroundColor[3]).to.equal(summaryTable[3].color);
        expect(summaryChart.datasets[0].backgroundColor[4]).to.equal(summaryTable[4].color);
    });

    it('has related summary chart data with summary table data if less times are provided', () => {
        let trackerSource = trackerFactory.create('data.performance.timer', {
            laravel: 350,
            boot: 9.1234567,
            middleware: 3.448009490966797,
            request: 101.3669586181641,
            response: 2.4479793548583984,
            'total-request': 110,
        });
        delete trackerSource.data.performance.timer.middleware;
        let performance = new HttpPerformance(trackerSource.data.performance);

        let summaryTable = performance.summaryTableData();
        let summaryChart = performance.summaryChartData();

        expect(summaryChart.labels.length).to.equal(4);
        expect(summaryChart.labels.length).to.equal(summaryTable.length);

        expect(summaryChart.labels[0]).to.equal(summaryTable[0].label);
        expect(summaryChart.labels[1]).to.equal(summaryTable[1].label);
        expect(summaryChart.labels[2]).to.equal(summaryTable[2].label);
        expect(summaryChart.labels[3]).to.equal(summaryTable[3].label);

        expect(summaryChart.datasets[0].data.length).to.equal(4);
        expect(summaryChart.datasets[0].data).to.deep.equal(Object.values(performance.summary));

        expect(summaryChart.datasets[0].backgroundColor.length).to.equal(4);
        expect(summaryChart.datasets[0].backgroundColor[0]).to.equal(summaryTable[0].color);
        expect(summaryChart.datasets[0].backgroundColor[1]).to.equal(summaryTable[1].color);
        expect(summaryChart.datasets[0].backgroundColor[2]).to.equal(summaryTable[2].color);
        expect(summaryChart.datasets[0].backgroundColor[3]).to.equal(summaryTable[3].color);
    });
});
