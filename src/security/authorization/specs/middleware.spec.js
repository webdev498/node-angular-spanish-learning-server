// import * as AuthorizationMiddleware from '../middleware';
// import UnauthorizedError from 'exceptions/requests/Unauthorized';
// import UserService from 'users/service/UserService';
// import * as logger from 'logging';
// import User from 'users/models/User';
//
// import { expect } from 'chai';
// import { stub, spy } from 'sinon';
//
//
// describe('Authorization Middleware', () => {
//   const options = null,
//         next = spy();
//
//   describe('when registered with the server', () => {
//     const server = {};
//
//     beforeEach(() => {
//       server.ext = spy();
//       AuthorizationMiddleware.register(server, options, next);
//     });
//
//     it('subscribes to the onPostAuth event', () => {
//       expect(server.ext).to.have.been.calledWith('onPostAuth');
//     });
//
//     it('forwards to the next plugin in the register chain', () => {
//       expect(next).to.have.been.called;
//     });
//   });
//
//   describe('when authorizeRequest is invoked as the onPostAuth handler', () => {
//     const credentials = { id: '12345'};
//
//     describe('and the route has permissions and the request is authenticated', () => {
//
//       const request = {
//         method: 'get',
//         path: '/users',
//         orig: {},
//         info: {
//           remoteAddress: '192.168.0.1'
//         },
//         auth: {
//           credentials
//         },
//         route: {
//           settings: {
//             plugins: {
//               [AuthorizationMiddleware.name]: {
//                 permission: 'urn:cgi:permisson:users::list'
//               }
//             }
//           }
//         }
//       };
//
//
//       describe('and the user has the necessary permission in their role', () => {
//         const reply = {};
//         reply.continue = spy();
//         const service = new UserService();
//
//         before(async () => {
//           const user = new User();
//           stub(service, 'get').returns(Promise.resolve(user));
//           stub(user, 'hasPermission').returns(Promise.resolve(true));
//
//           await AuthorizationMiddleware.authorizeRequest(request, reply);
//         });
//
//         after(() => UserService.get.restore());
//
//         it('continues the request to the next handler in the chain', () => {
//           expect(reply.continue).to.have.been.called;
//         });
//       });
//
//       describe('and the user\'s role does not have the necessary permissions', () => {
//         const user = new User();
//         const reply = spy();
//
//         before(async () => {
//           stub(UserService, 'get').returns(Promise.resolve(user));
//           stub(user, 'hasPermission').returns(Promise.resolve(false));
//
//           await AuthorizationMiddleware.authorizeRequest(request, reply);
//         });
//
//         after(() => UserService.get.restore());
//
//         it('replies with a UnauthorizedError', () => {
//           expect(reply.args[0][0]).to.be.instanceof(UnauthorizedError);
//         });
//       });
//
//     });
//
//     describe('and the route does not have permissions', () => {
//       const reply = {};
//       reply.continue = spy();
//
//       const request = {
//         auth: {
//           credentials
//         },
//         route: {
//           settings: {
//             plugins: {
//               [AuthorizationMiddleware.name]: {
//               }
//             }
//           }
//         }
//       };
//
//       before(async () => {
//         await AuthorizationMiddleware.authorizeRequest(request, reply);
//       });
//       it('continues to the next handler in the request chain', () => {
//         expect(reply.continue).to.have.been.called;
//       });
//     });
//
//     describe('and the request is not authenticated', () => {
//       const reply = {};
//       reply.continue = spy();
//
//       const request = {
//         auth: {},
//         route: {
//           settings: {
//             plugins: {
//               [AuthorizationMiddleware.name]: {
//                 permission: 'urn:cgi:permisson:users::list'
//               }
//             }
//           }
//         }
//       };
//
//       before(async () => {
//         await AuthorizationMiddleware.authorizeRequest(request, reply);
//       });
//
//       it('continues to the next handler in the request chain', () => {
//         expect(reply.continue).to.have.been.called;
//       });
//     });
//   });
// });
