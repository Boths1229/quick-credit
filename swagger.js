export default {
  swagger: '2.0',
  info: {
    version: '1.0',
    title: 'Quick Credit',
    description:
    'Quick Credit is an online lending platform that provides short term soft loans to individuals.',
    contact: {},
  },
  host: 'localhost:3000',
  basePath: '/api/v1',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/auth/signup': {
      post: {
        description: 'User Registration',
        summary: 'localhost:3000/api/v1/auth/signup',
        operationId: 'UserSignupPost',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'firstName',
            in: 'formData',
            type: 'string',
            description: '',
          },
          {
            name: 'lastName',
            in: 'formData',
            type: 'string',
            description: '',
          },
          {
            name: 'email',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'password',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'age',
            in: 'formData',
            required: true,
            type: 'number',
            description: '',
          }
        ],
        responses: {
          201: {
            description: '',
            schema: {
              $ref: '#definitions/signup'
            },
            examples: {
              'application/json': {
                message: 'Signup successful',
                token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6IkxhbGFhbGEiLCJsYXN0TmFtZSI6IlJvbWFub3MiLCJpZCI6IjVjMTFjN2YyZDkyYzkyZjQwZGE0ZmQwYSJ9LCJpYXQiOjE1NDQ2NjkxNzAsImV4cCI6MTU0NDY3OTk3MH0.3ZjrouCOV4L0tIdAOrXoBI3oTb2A6ROEjnAtRgG_qqg',
              },
            },
            headers: {}
          },
          409: {
            description: '',
            schema: {
              $ref: '#definitions/signupError'
            },
            examples: {
              'application/json': {
                message: 'email already in use'
              },
            },
            headers: {}
          }
        }
      }
    },
    '/auth/signin': {
      post: {
        description: 'User signin',
        summary: 'localhost:3000/api/v1/auth/signin',
        operationId: 'UserSigninPost',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'email',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'password',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          }
        ],
        responses: {
          200: {
            description: '',
            schema: {
              $ref: '#definitions/signin'
            },
            examples: {
              'application/json': {
                message: 'Signin successful',
                token:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6IkxhbGFhbGEiLCJsYXN0TmFtZSI6IlJvbWFub3MiLCJpZCI6IjVjMTFjN2YyZDkyYzkyZjQwZGE0ZmQwYSJ9LCJpYXQiOjE1NDQ2NjkxNzAsImV4cCI6MTU0NDY3OTk3MH0.3ZjrouCOV4L0tIdAOrXoBI3oTb2A6ROEjnAtRgG_qqg',
              },
            },
            headers: {}
          },
          400: {
            description: '',
            schema: {
              $ref: '#definitions/signinError'
            },
            examples: {
              'application/json': {
                message: 'invalid credentials'
              },
            },
            headers: {}
          }
        }
      }
    },
    '/users/:useremail/verify': {
      patch: {
        description: 'User verification',
        summary: 'localhost:3000/api/v1/users/:useremail/verify',
        operationId: 'AdminVerifyUser',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [],
        responses: {
          201: {
            description: '',
            schema: {
              $ref: '#definitions/verified'
            },
            examples: {
              'application/json': {
                message: 'addresses verified'
              },
            },
            headers: {}
          },
          404: {
            description: '',
            schema: {
              $ref: '#definitions/unverified'
            },
            examples: {
              'application/json': {
                message: 'addresses not verified'
              },
            },
            headers: {}
          }
        }
      }
    },
    '/loans': {
      post: {
        description: 'User apply loan',
        summary: 'localhost:3000/api/v1/loans',
        operationId: 'UserApplyLoan',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'firstName',
            in: 'formData',
            type: 'string',
            description: '',
          },
          {
            name: 'lastName',
            in: 'formData',
            type: 'string',
            description: '',
          },
          {
            name: 'valid',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'amount',
            in: 'formData',
            required: true,
            type: 'number',
            description: '',
          },
          {
            name: 'paymentInstallment',
            in: 'formData',
            required: true,
            type: 'number',
            description: '',
          },
          {
            name: 'bank_details.account_number',
            in: 'formData',
            required: true,
            type: 'number',
            description: '',
          }
        ],
        responses: {
          201: {
            description: '',
            schema: {
              $ref: '#definitions/applyLoan'
            },
            examples: {
              'application/json': {
                message: 'loan application successful',
              },
            },
            headers: {}
          },
          400: {
            description: '',
            schema: {
              $ref: '#definitions/loanApplicationError'
            },
            examples: {
              'application/json': {
                message: 'invalid details'
              },
            },
            headers: {}
          }
        }
      }
    },
    '/loans': {
      get: {
        description: 'All loan applications',
        summary: 'localhost:3000/api/v1/loans',
        operationId: 'AdminGetAllLoans',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'firstName',
            in: 'query',
            type: 'string',
            description: '',
          },
          {
            name: 'lastName',
            in: 'query',
            type: 'string',
            description: '',
          },
          {
            name: 'valid',
            in: 'query',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'amount',
            in: 'query',
            required: true,
            type: 'number',
            description: '',
          },
          {
            name: 'paymentInstallment',
            in: 'query',
            required: true,
            type: 'number',
            description: '',
          },
          {
            name: 'bank_details.account_number',
            in: 'query',
            required: true,
            type: 'number',
            description: '',
          }
        ],
        responses: {
          201: {
            description: '',
            schema: {
              $ref: '#definitions/AllLoans'
            },
            examples: {
              'application/json': {
                message: 'All loan applications',
              },
            },
            headers: {}
          },
          404: {
            description: '',
            schema: {
              $ref: '#definitions/loanError'
            },
            examples: {
              'application/json': {
                message: ''
              },
            },
            headers: {}
          }
        }
      }
    },
    '/repaidLoans': {
      get: {
        description: 'User Registration',
        summary: 'localhost:3000/api/v1/repaidLoans',
        operationId: 'AllRepaidLoans',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [],
        responses: {
          201: {
            description: '',
            schema: {
              $ref: '#definitions/repaidLoans'
            },
            examples: {
              'application/json': {
                message: 'All repaid loans'
              },
            },
            headers: {}
          },
          404: {
            description: '',
            schema: {
              $ref: '#definitions/noRepaidLoans'
            },
            examples: {
              'application/json': {
                message: 'none found'
              },
            },
            headers: {}
          }
        }
      }
    },
    '/currentLoans': {
      get: {
        description: 'All current Loans',
        summary: 'localhost:3000/api/v1/currentLoans',
        operationId: 'AllCurrentLoans',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [],
        responses: {
          201: {
            description: '',
            schema: {
              $ref: '#definitions/currentLoans'
            },
            examples: {
              'application/json': {
                message: 'All current loans'
              },
            },
            headers: {}
          },
          404: {
            description: '',
            schema: {
              $ref: '#definitions/noCurrentLOan'
            },
            examples: {
              'application/json': {
                message: 'No loan found'
              },
            },
            headers: {}
          }
        }
      }
    },
    '/loans/:id': {
      get: {
        description: 'Get specific loan',
        summary: 'localhost:3000/api/loans/:id',
        operationId: 'GetSpecificLoan',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [],
        responses: {
          201: {
            description: '',
            schema: {
              $ref: '#definitions/specificLoan'
            },
            examples: {
              'application/json': {
                message: 'loan fetched'
              },
            },
            headers: {}
          },
          404: {
            description: '',
            schema: {
              $ref: '#definitions/IdError'
            },
            examples: {
              'application/json': {
                message: 'wrong Id'
              },
            },
            headers: {}
          }
        }
      }
    },
    '/loans/:loanid': {
      patch: {
        description: 'Approve Loans',
        summary: 'localhost:3000/api/v1/loans/:loanid',
        operationId: 'AdminApproveLoan',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [],
        responses: {
          201: {
            description: '',
            schema: {
              $ref: '#definitions/approveLoan'
            },
            examples: {
              'application/json': {
                message: 'loan approved'
              },
            },
            headers: {}
          },
          400: {
            description: '',
            schema: {
              $ref: '#definitions/notApproved'
            },
            examples: {
              'application/json': {
                message: 'loanId not found'
              },
            },
            headers: {}
          }
        }
      }
    },
    '/loans/:loanid/repayments': {
      post: {
        description: 'Loan Repayment posting',
        summary: 'localhost:3000/api/v1/loans/:loanid/repayments',
        operationId: 'AdminPostLoan',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'loanId',
            in: 'formData',
            type: 'number',
            description: '',
          },
          {
            name: 'amount',
            in: 'formData',
            type: 'number',
            description: '',
          },
          {
            name: 'monthlyInstallment',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'paidAmount',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'balance',
            in: 'formData',
            required: true,
            type: 'number',
            description: '',
          }
        ],
        responses: {
          201: {
            description: '',
            schema: {
              $ref: '#definitions/paymentPosting'
            },
            examples: {
              'application/json': {
                message: 'Payment posting successful'
              },
            },
            headers: {}
          },
          400: {
            description: '',
            schema: {
              $ref: '#definitions/postingError'
            },
            examples: {
              'application/json': {
                message: 'wrong loanId'
              },
            },
            headers: {}
          }
        }
      }
    },
    '/loans/:loanid/repayments': {
      get: {
        description: 'User Repayment History',
        summary: 'localhost:3000/api/v1/loans/:loanid/repayments',
        operationId: 'UserRepaymentHistory',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [],
        responses: {
          201: {
            description: '',
            schema: {
              $ref: '#definitions/viewloanrepayments'
            },
            examples: {
              'application/json': {
                message: 'loan repayment record'
              },
            },
            headers: {}
          },
          404: {
            description: '',
            schema: {
              $ref: '#definitions/loanHistoryError'
            },
            examples: {
              'application/json': {
                message: 'not found'
              },
            },
            headers: {}
          }
        }
      }
    },
  },
  definitions: {
    signup: {
      title: 'localhost:3000/api/v1/auth/signup',
      example: {
        message: 'User created',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6IkxhbGFhbGEiLCJsYXN0TmFtZSI6IlJvbWFub3MiLCJpZCI6IjVjMTFjN2YyZDkyYzkyZjQwZGE0ZmQwYSJ9LCJpYXQiOjE1NDQ2NjkxNzAsImV4cCI6MTU0NDY3OTk3MH0.3ZjrouCOV4L0tIdAOrXoBI3oTb2A6ROEjnAtRgG_qqg',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        token: {
          type: 'string',
        },
      },
      required: ['message', 'token'],
    },
    signupError: {
      title: 'localhost:3000/api/v1/auth/signup',
      example: {
        message: 'email already in use',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    signin: {
      title: 'localhost:3000/api/v1/auth/signin',
      example: {
        message: 'signin successful',
        token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6IkxhbGFhbGEiLCJsYXN0TmFtZSI6IlJvbWFub3MiLCJpZCI6IjVjMTFjN2YyZDkyYzkyZjQwZGE0ZmQwYSJ9LCJpYXQiOjE1NDQ2NjkxNzAsImV4cCI6MTU0NDY3OTk3MH0.3ZjrouCOV4L0tIdAOrXoBI3oTb2A6ROEjnAtRgG_qqg',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        token: {
          type: 'string',
        },
      },
      required: ['message', 'token'],
    },
    signinError: {
      title: 'localhost:3000/api/v1/auth/signin',
      example: {
        message: 'invalid credentials',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    verify: {
      title: 'localhost:3000/api/v1/users/verify',
      example: {
        message: 'addresses verified'
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        }
      },
      required: ['message'],
    },
    unverified: {
      title: 'localhost:3000/api/v1/users/verify',
      example: {
        message: 'addresses not verified',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    applyloan: {
      title: 'localhost:3000/api/v1/loans',
      example: {
        message: 'loan application successful'
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        }
      },
      required: ['message'],
    },
    loanaApplicationError: {
      title: 'localhost:3000/api/v1/loans',
      example: {
        message: 'invalid details',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    AllLoans: {
      title: 'localhost:3000/api/v1/loans',
      example: {
        message: 'All loan applications'
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        }
      },
      required: ['message'],
    },
    loanError: {
      title: 'localhost:3000/api/v1/loans',
      example: {
        message: '',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    repaidLoans: {
      title: 'localhost:3000/api/v1/repaidLoans',
      example: {
        message: 'ALL repaid loans'
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        }
      },
      required: ['message'],
    },
    noRepaidLoans: {
      title: 'localhost:3000/api/v1/repaidLoans',
      example: {
        message: 'No loan found',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    currentLoans: {
      title: 'localhost:3000/api/v1/currentLoans',
      example: {
        message: 'All currentLoans'
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        token: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    noCurrentLOan: {
      title: 'localhost:3000/api/v1/currentLoans',
      example: {
        message: 'no loan found',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    specific: {
      title: 'localhost:3000/api/v1/loans/:id',
      example: {
        message: 'loan fetched'
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    IdError: {
      title: 'localhost:3000/api/v1/loans/:id',
      example: {
        message: 'wrong id',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    approve: {
      title: 'localhost:3000/api/v1/loans/:loanId',
      example: {
        message: 'loan approved'
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        token: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    notApproved: {
      title: 'localhost:3000/api/v1/loans/:loanId',
      example: {
        message: 'wrong loanId',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    paymentPosting: {
      title: 'localhost:3000/api/v1/loans/:loanid/repayments',
      example: {
        message: 'payment posting successful'
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    postingError: {
      title: 'localhost:3000/api/v1/loans/:loanId/repayments',
      example: {
        message: 'wrong loanId',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    laonPamentHistory: {
      title: 'localhost:3000/api/v1/loans/:loanId/repayments',
      example: {
        message: 'loan repayment record'
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    loanHistoryError: {
      title: 'localhost:3000/api/v1/loans/:loanId/repayments',
      example: {
        message: 'not found',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
  }
};