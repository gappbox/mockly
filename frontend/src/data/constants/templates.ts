import { Template } from '../models';

export const templates: Template[] = [
  {
    name: 'Financial Transaction',
    id: '8c6b4aa7-02e2-43f5-83c8-fa244f23e183',
    isReadonly: true,
    fields: [
      { id: '6677af45-5e12-45fe-aecb-8bee9b04465d', field: 'id', category: 'string', type: 'uuid' },
      { id: '0983c242-f64c-4b55-baef-b21f2e0cb4ee', field: 'accountNumber', category: 'finance', type: 'accountNumber' },
      { id: '4604f8ed-9ad0-4a34-a49a-7493d0e125f9', field: 'currency', category: 'finance', type: 'currencyCode' },
      { id: 'c6056188-b5d4-4c5a-b2b1-93f75bf23839', field: 'amount', category: 'finance', type: 'amount' },
      { id: '18f9e356-05ee-4aa9-ad2d-6c6c9920aa61', field: 'transactionType', category: 'finance', type: 'transactionType' },
      { id: 'c8614f67-f392-4482-a008-edda3bf68ae3', field: 'transactionDescription', category: 'finance', type: 'transactionDescription' },
    ]
  },
  {
    name: 'Git Repository',
    id: 'bd25c563-803f-4bfc-bdb9-4021f492f5e8',
    isReadonly: true,
    fields: [
      { id: '8bd22cb9-12fb-4b97-b1ba-26f7fc5713b1', field: 'id', category: 'string', type: 'uuid' },
      { id: 'a8136508-bd8c-4d2a-973b-aa55f2aec6f6', field: 'repository', category: 'string', type: 'nanoid' },
      { id: '92054caa-4f05-4fc2-b111-c0bc44204b0e', field: 'branch', category: 'git', type: 'branch' },
      { id: '73e68998-abf0-4752-aa02-b20d2d3deb90', field: 'message', category: 'git', type: 'commitMessage' },
      { id: 'ecf4c113-b0ad-4a65-a9b2-45bac771e5c2', field: 'sha', category: 'git', type: 'commitSha' },
      { id: 'b5c2fcd3-64e2-427c-81b0-a24093859115', field: 'date', category: 'git', type: 'commitDate' },
    ]
  },
  {
    name: 'Product Catalog',
    id: 'c0b40863-524b-4593-945e-a29203bd7d47',
    isReadonly: true,
    fields: [
      { id: '2ae2acf2-634a-41fc-abd0-31fb1eb0c585', field: 'id', category: 'string', type: 'uuid' },
      { id: '42b7ea76-c839-4317-a08c-6e200da2622c', field: 'name', category: 'commerce', type: 'productName' },
      { id: '81410f3f-1f51-46e7-8ece-2c107b5b1b17', field: 'price', category: 'finance', type: 'amount' },
      { id: '46d0edb3-8250-40a2-867b-4f27e3782744', field: 'category', category: 'commerce', type: 'department' },
      { id: 'e4d943d8-8dd9-4185-aa1b-255b5430aae7', field: 'description', category: 'commerce', type: 'productDescription' },
      { id: '82762ed7-f934-4527-9657-6a648d3cb501', field: 'material', category: 'commerce', type: 'productMaterial' },
    ],
  },
  {
    name: 'Real Estate Listing',
    id: '883d8b24-393f-404e-8a78-66b46e22f8b8',
    isReadonly: true,
    fields: [
      { id: 'ec02a942-cac7-4a6f-96fd-747bc6e76f8b', field: 'id', category: 'string', type: 'uuid' },
      { id: '3232a0a1-abac-470c-bf24-47bb0a0a3cf3', field: 'propertyName', category: 'string', type: 'nanoid' },
      { id: '15b0b75a-ca02-42a0-94a7-5679f666a0aa', field: 'address', category: 'location', type: 'streetAddress' },
      { id: '521d5265-84ad-4242-a3f1-2291191290e8', field: 'city', category: 'location', type: 'city' },
      { id: 'bee95670-86b1-4990-9ddb-c64a19063017', field: 'price', category: 'finance', type: 'amount' },
      { id: 'b0104b41-233f-4354-9023-ef0f5b7aab58', field: 'squareFootage', category: 'number', type: 'float' },
    ]
  },
  {
    name: 'Vehicle Fleet Management',
    id: 'a263468c-a43a-4237-8603-1669c82e8761',
    isReadonly: true,
    fields: [
      { id: 'a70be1f1-fbe6-4141-936a-209aedf09fd2', field: 'vehicleId', category: 'string', type: 'uuid' },
      { id: 'a670f419-be04-429c-be50-b0af4b7879bf', field: 'vehicleType', category: 'vehicle', type: 'type' },
      { id: 'c0a24c49-261d-4c76-b150-e068ed497ff3', field: 'ownerName', category: 'person', type: 'fullName' },
      { id: 'f3e6ec40-2adc-4954-bd7d-557a7c10b344', field: 'ownerEmail', category: 'internet', type: 'email' },
      { id: 'cfcbfed4-2225-4934-8026-0f127640df97', field: 'model', category: 'vehicle', type: 'model' },
      { id: '347d1eec-a208-42bb-8dd6-12f78c16b621', field: 'color', category: 'vehicle', type: 'color' },
      { id: 'b366be63-8169-4983-87fb-cabbd3d27c1f', field: 'vin', category: 'vehicle', type: 'vin' },
      { id: '4b854b82-5108-47d0-a4b7-66955d50df75', field: 'fuelType', category: 'vehicle', type: 'fuel' },
      { id: 'ef1f531c-57cd-4e5e-b3fd-70c104ff6f09', field: 'manufacturer', category: 'vehicle', type: 'manufacturer' },
      { id: '55c3d4ea-aa13-474b-bcf0-4795a7b454a4', field: 'licensePlate', category: 'string', type: 'nanoid' },
      { id: '6723404e-a9d9-4ff8-bc98-44de5ceb268f', field: 'registration', category: 'number', type: 'int' },
      { id: '82a30c45-6454-47eb-9e4c-dae71f2f753e', field: 'mileage', category: 'number', type: 'float' },
      { id: '15f1fd93-907c-4c96-8062-2abbd42bd30b', field: 'lastServiceDate', category: 'number', type: 'int' },
      { id: '7d5e060c-a0ca-4b1d-ba5c-fde23b1fe334', field: 'insuranceCompany', category: 'company', type: 'name' },
    ]
  },
  {
    name: 'User Profile',
    id: '0deb43b3-112e-430d-9cb8-fded9a7b16ae',
    isReadonly: true,
    fields: [
      { id: '1a99ff36e-0d5d-4dcb-a02b-324b37c93309', field: 'id', category: 'string', type: 'uuid' },
      { id: '2b98c8e3-45a1-4b48-b748-c657efb65cee', field: 'firstName', category: 'person', type: 'firstName' },
      { id: '3c4e7fbc-ced9-404d-8404-b73855875e99', field: 'lastName', category: 'person', type: 'lastName' },
      { id: '4d45fd04-64d7-464d-a3a9-594a0cd4c674', field: 'middleName', category: 'person', type: 'middleName' },
      { id: '222fce6c-ff65-4674-bd5f-0f84bb09925d', field: 'gender', category: 'person', type: 'gender' },
      { id: 'c8aa084e-7e55-46a0-b14c-85d887812f2b', field: 'email', category: 'internet', type: 'email' },
      { id: 'ce9d3903-e278-47c3-a24a-c565f6d17ddd', field: 'phone', category: 'phone', type: 'number' },
      { id: '5c62088b-b96b-4b67-a419-05829bab282e', field: 'address', category: 'location', type: 'streetAddress' },
      { id: '343474be-ef23-4719-84a0-e7d7d476768d', field: 'city', category: 'location', type: 'city' },
      { id: '79baaddf-898b-4f07-b742-0716694d6f3f', field: 'state', category: 'location', type: 'state' },
      { id: 'f41b83ae-d480-4ce2-a1e0-334447bf5c75', field: 'zipCode', category: 'location', type: 'zipCode' },
      { id: '59c7680f-bda4-44c6-a412-e3d70ed5c168', field: 'jobTitle', category: 'person', type: 'jobTitle' },
      { id: '90d194b7-2b16-4f4e-a09c-9f212f27a2d1', field: 'company', category: 'company', type: 'name' },
    ],
  },
];