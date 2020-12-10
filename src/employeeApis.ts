import { EmployeeData, Employee } from './employee.ts';

// Returns all available employees
export const getAllEmployees = ({ response }: { response: any }) => {
    response.body = EmployeeData;
};

// Returns one employee by its Id or 404 if not found
export const getEmployeeById = ({ params, response }: { params: { id: string }; response: any }) => {
    const selectedEmployee: Employee | undefined = EmployeeData.find((employee) =>
        employee.id === +params.id
    );
    if (selectedEmployee) {
        response.status = 200;
        response.body = selectedEmployee;
    }
    else {
        response.status = 404;
        response.body = [];
    }
};

// Add a new employee to the list
export const addEmployee = async (
    { request, response }: { request: any; response: any },
) => {
    if (!request.hasBody) {
        response.status = 400;
    } else {
        const newEmployee: Employee = await request.body();

        newEmployee.id = getNextEmployeeId();
        EmployeeData.push(newEmployee);
        response.status = 201;
    }
};

//Provides the next number to be used as employee Id
function getNextEmployeeId(): number {
    let maxId = 1;
    EmployeeData.forEach(p => {
        maxId = Math.max(p.id, maxId);
    });
    return maxId + 1;
}

// Removes an employee by its Id or 404 if not found
export const deleteEmployee = (
    { params, response }: { params: { id: string }; response: any },
) => {
    const targetId = +params.id;
    const newEmployeeList = EmployeeData.filter(x => x.id !== targetId);
    if (newEmployeeList.length < EmployeeData.length) {
        replaceCollection(EmployeeData, newEmployeeList);
        response.status = 200;
    } else {
        response.status = 404;
    }
};

// Updates en existing employee
export const updateEmployee = async (
    { params, request, response }: {
        params: { id: string };
        request: any;
        response: any;
    },
) => {
    const targetId = +params.id;
    let employeeToUpdate: Employee | undefined = EmployeeData.find((employee) =>
        employee.id === targetId
    );
    if (employeeToUpdate) {
        const body = await request.body();
        const newEmployeeData: Employee = body.value;

        let updatedData = EmployeeData.map((e: Employee) => {
            return e.id === targetId ? { ...e, ...newEmployeeData } : e;
        });

        replaceCollection(EmployeeData, updatedData);
        response.status = 200;
    } else {
        response.status = 404;
    }
};

// Replaces the employee data structure with a new collection
function replaceCollection(originalData: Employee[], newData: Employee[]) {
    originalData.splice(0, originalData.length);
    originalData.push(...newData);
}