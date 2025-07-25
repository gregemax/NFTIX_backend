"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const comments_controller_1 = require("./comments.controller");
const comments_service_1 = require("./comments.service");
describe('CommentsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [comments_controller_1.CommentsController],
            providers: [comments_service_1.CommentsService],
        }).compile();
        controller = module.get(comments_controller_1.CommentsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=comments.controller.spec.js.map