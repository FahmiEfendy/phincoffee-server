const _ = require("lodash");
const request = require("supertest");

const db = require("../../models");
const categoryApi = require("../../server/api/category");
const generalHelper = require("../../server/helpers/generalHelper");
const categoryListData = require("./fixtures/database/categoryListData.json");
const categoryDetailData = require("./fixtures/database/categoryDetailData.json");

let server;
let apiUrl;

let mockAllCategory;
let getAllCategory;
let mockCategoryDetail;
let getCategoryDetail;

let id;
let payload;
let postCreateCategory;
let patchUpdateCategory;
let deleteCategory;

describe("Category", () => {
  beforeAll(() => {
    server = generalHelper.createTestServer("/category", categoryApi);
    apiUrl = "/category";
  });

  afterAll(async () => {
    await server.close();
  });

  describe("GET Category List", () => {
    beforeEach(() => {
      mockAllCategory = _.cloneDeep(categoryListData);
      getAllCategory = jest.spyOn(db.Categories, "findAll");
    });

    test("Should Return 200: GET All Category Success", async () => {
      getAllCategory.mockResolvedValue(mockAllCategory);

      await request(server)
        .get(`${apiUrl}/list`)
        .expect(200)
        .then((res) => expect(res.body.data.length).toBe(10));
    });

    test("Should Return 404: GET All Category Success But Empty", async () => {
      getAllCategory.mockResolvedValue([]);

      await request(server)
        .get(`${apiUrl}/list`)
        .expect(404)
        .then((res) => expect(res.body.message).toBe("No category found!"));
    });

    test("Should Return 404: GET Search Category Not Found", async () => {
      getAllCategory.mockResolvedValue([]);

      await request(server)
        .get(`${apiUrl}/list`)
        .query({ name: "trash" })
        .expect(404)
        .then((res) => expect(res.body.error).toBe("Not Found"));
    });
  });

  describe("GET Category Detail", () => {
    beforeEach(() => {
      mockCategoryDetail = _.cloneDeep(categoryDetailData);
      getCategoryDetail = jest.spyOn(db.Categories, "findOne");
    });

    test("Should Return 200: GET Category Detail for Coffee", async () => {
      getCategoryDetail.mockResolvedValue(mockCategoryDetail);

      await request(server)
        .get(`${apiUrl}/detail/coffee`)
        .expect(200)
        .then((res) => expect(res.body.data.id).toBe("coffee"));
    });

    test("Should Return 404: GET Category Detail Not Found", async () => {
      getCategoryDetail.mockResolvedValue(null);

      await request(server)
        .get(`${apiUrl}/detail/1234567890`)
        .expect(404)
        .then((res) => expect(res.body.error).toBe("Not Found"));
    });
  });

  describe("POST Create Category", () => {
    beforeEach(() => {
      payload = {
        name: "Cake",
        description: "Delicious cake with affordable price",
        image: [
          {
            fieldname: "image",
            originalname: "placeholder.jpg",
            encoding: "7bit",
            mimetype: "image/jpeg",
            buffer: Buffer.from([]),
            size: 0,
          },
        ],
      };

      getCategoryDetail = jest.spyOn(db.Categories, "findOne");
      postCreateCategory = jest.spyOn(db.Categories, "create");
    });

    // TODO: Fix Image Undefined
    // test("Should Return 201: POST Create Category Success", async () => {
    //   postCreateCategory.mockResolvedValue("Success");

    //   await request(server)
    //     .post(`${apiUrl}/create`)
    //     .send(payload)
    //     // .expect(201)
    //     .then((res) => {
    //       console.log(res.body);
    //       expect(res.body.data).toBeTruthy();
    //     });
    // });

    test("Should Return 400: POST Create Category Failed, Category Exist", async () => {
      getCategoryDetail.mockResolvedValue({ name: "Coffee" });
      postCreateCategory.mockResolvedValue("Success");

      await request(server)
        .post(`${apiUrl}/create`)
        .send(payload)
        .expect(400)
        .then((res) => expect(res.body.error).toBe("Bad Request"));
    });

    test("Should Return 400: POST Create Category Failed Because of Empty Payload", async () => {
      postCreateCategory.mockResolvedValue("Success");

      await request(server)
        .post(`${apiUrl}/create`)
        .send({})
        .expect(400)
        .then((res) => expect(res.body.error).toBe("Bad Request"));
    });
  });

  describe("PATCH Update Category", () => {
    beforeEach(() => {
      id = "coffee";

      payload = {
        description: "Best coffee in town",
      };

      mockCategoryDetail = _.cloneDeep(categoryDetailData);
      getCategoryDetail = jest.spyOn(db.Categories, "findOne");
      patchUpdateCategory = jest.spyOn(db.Categories, "update");
    });

    test("Should Return 201: Patch Update Category Success", async () => {
      getCategoryDetail.mockResolvedValue(mockCategoryDetail);
      patchUpdateCategory.mockResolvedValue("Success");

      await request(server)
        .patch(`${apiUrl}/update/${id}`)
        .send(payload)
        .expect(200)
        .then((res) =>
          expect(res.body.message).toBe("Successfully Update a Category")
        );
    });

    test("Should Return 404: PATCH Update Category Failed, Because of Category Not Exist", async () => {
      id = "trash";
      getCategoryDetail.mockResolvedValue([]);
      patchUpdateCategory.mockResolvedValue("Success");

      await request(server)
        .patch(`${apiUrl}/update/${id}`)
        .send(payload)
        .expect(404)
        .then((res) => expect(res.body.error).toBe("Not Found"));
    });

    test("Should Return 400: PATCH Update Category Failed Because of Empty Payload", async () => {
      patchUpdateCategory.mockResolvedValue("Success");

      await request(server)
        .patch(`${apiUrl}/update/${id}`)
        .send({})
        .expect(400)
        .then((res) => expect(res.body.error).toBe("Bad Request"));
    });
  });

  describe("DELETE Customer", () => {
    beforeEach(() => {
      id = "coffee";

      mockCategoryDetail = _.cloneDeep(categoryDetailData);
      getCategoryDetail = jest.spyOn(db.Categories, "findOne");
      deleteCategory = jest.spyOn(db.Categories, "destroy");
    });

    test("Should Return 202: DELETE Customer Success", async () => {
      getCategoryDetail.mockResolvedValue(mockCategoryDetail);
      deleteCategory.mockResolvedValue("Success");

      await request(server)
        .delete(`${apiUrl}/delete/${id}`)
        .expect(202)
        .then((res) => console.log(res.body));
    });

    test("Should Return 404: DELETE Customer Failed Because Not Found", async () => {
      id = "trash";

      getCategoryDetail.mockResolvedValue(null);
      deleteCategory.mockResolvedValue("Success");

      await request(server)
        .delete(`${apiUrl}/delete/${id}`)
        .expect(404)
        .then((res) => expect(res.body.error).toBe("Not Found"));
    });
  });
});
