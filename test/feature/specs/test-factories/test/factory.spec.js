import { Factory } from './../src/factory';

describe('Factory', () => {
    it('can create object based on model', () => {
        let model = { name: 'Joe', email: 'joe@example.com' };
        let userFactory = new Factory(model);

        let user = userFactory.create();

        expect(user).to.deep.equal({ name: 'Joe', email: 'joe@example.com' });
    });

    it('can create object with changed props and keep model untouched', () => {
        let model = { name: 'Joe', email: 'joe@example.com' };
        let userFactory = new Factory(model);

        let user = userFactory.create({ name: 'Tom' });

        expect(user).to.deep.equal({ name: 'Tom', email: 'joe@example.com' });
        expect(model).to.deep.equal({ name: 'Joe', email: 'joe@example.com' });
    });

    it('object props can be changed more then once', () => {
        let model = { name: 'Joe', email: 'joe@example.com' };
        let userFactory = new Factory(model);

        let userA = userFactory.set({ name: 'Tom' }).set({ name: 'Ben' }).create();
        let userB = userFactory.set({ name: 'Ben' }).create({ name: 'Adam' });

        expect(userA).to.deep.equal({ name: 'Ben', email: 'joe@example.com' });
        expect(userB).to.deep.equal({ name: 'Adam', email: 'joe@example.com' });
        expect(model).to.deep.equal({ name: 'Joe', email: 'joe@example.com' });
    });

    it('can create many objects with different props', () => {
        let model = { name: 'Joe', email: 'joe@example.com' };
        let userFactory = new Factory(model);

        let userA = userFactory.create();
        let userB = userFactory.create({ name: 'Tom' });
        let userC = userFactory.create();
        let userD = userFactory.create({ name: 'Ben' });
        let userE = userFactory.create({ email: 'kris@example.com' });
        let userF = userFactory.create({ name: 'Adam', email: 'adam@example.com' });
        let userG = userFactory.set({ name: 'Adam' }).set({ email: 'adam@example.com' }).create();
        let userH = userFactory.create();

        expect(userA).to.deep.equal({ name: 'Joe', email: 'joe@example.com' });
        expect(userB).to.deep.equal({ name: 'Tom', email: 'joe@example.com' });
        expect(userC).to.deep.equal({ name: 'Joe', email: 'joe@example.com' });
        expect(userD).to.deep.equal({ name: 'Ben', email: 'joe@example.com' });
        expect(userE).to.deep.equal({ name: 'Joe', email: 'kris@example.com' });
        expect(userF).to.deep.equal({ name: 'Adam', email: 'adam@example.com' });
        expect(userG).to.deep.equal({ name: 'Adam', email: 'adam@example.com' });
        expect(userH).to.deep.equal({ name: 'Joe', email: 'joe@example.com' });
        expect(model).to.deep.equal({ name: 'Joe', email: 'joe@example.com' });
    });

    it('can create object with deep changed props', () => {
        let model = {
            name: 'Joe',
            phone: {
                home: '12345',
                office: '67890',
            },
        };
        let userFactory = new Factory(model);

        let userA = userFactory.setIn('phone', { home: '54321' }).create();
        let userB = userFactory.create('phone', { office: '09876' });

        expect(userA).to.deep.equal({
            name: 'Joe',
            phone: {
                home: '54321',
                office: '67890',
            },
        });
        expect(userB).to.deep.equal({
            name: 'Joe',
            phone: {
                home: '12345',
                office: '09876',
            },
        });
    });

    it('can create object with deep changed props on any deep level', () => {
        let model = {
            email: 'joe@example.com',
            address: {
                street: 'Test Avenue',
                city: {
                    name: 'Miami',
                    state: {
                        name: 'Florida',
                        like: false,
                    },
                },
            },
        };
        let userFactory = new Factory(model);

        let userA = userFactory.setIn('address.city', { name: 'Orlando' }).create();
        let userB = userFactory.create('address.city.state', { like: true });

        expect(userA).to.deep.equal({
            email: 'joe@example.com',
            address: {
                street: 'Test Avenue',
                city: {
                    name: 'Orlando',
                    state: {
                        name: 'Florida',
                        like: false,
                    },
                },
            },
        });
        expect(userB).to.deep.equal({
            email: 'joe@example.com',
            address: {
                street: 'Test Avenue',
                city: {
                    name: 'Miami',
                    state: {
                        name: 'Florida',
                        like: true,
                    },
                },
            },
        });
    });

    it('set has the same interface as setIn', () => {
        let model = {
            email: 'joe@example.com',
            address: {
                street: 'Test Avenue',
                city: {
                    name: 'Miami',
                    state: {
                        name: 'Florida',
                        like: false,
                    },
                },
            },
        };
        let userFactory = new Factory(model);

        let userA = userFactory.set('address.city', { name: 'Orlando' }).create();
        let userB = userFactory.setIn('address.city', { name: 'Orlando' }).create();

        expect(userA).to.deep.equal(userB);
    });

    it('can dump current factory object to console', () => {
        let model = { name: 'Joe', email: 'joe@example.com' };
        let userFactory = new Factory(model);
        let mock = sinon.mock(userFactory);
        mock.expects('log').withArgs(userFactory.current).once();

        userFactory.dump();

        mock.verify();
        mock.restore();
    });
});
