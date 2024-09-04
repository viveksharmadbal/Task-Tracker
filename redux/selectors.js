export const selectemployeeSummary=(state)=>({
    totalEmployees:state.employee.employees.length || 0,
})

export const selectroleSummary=(state)=>({
    totalRoles:state.role.roles.length || 0
})

export const selectprojectSummary=(state)=>({
    totalProjects:state.project.projects.length || 0
})

export const selectTaskSummary = (state) => ({
    totalTasks: state.task?.tasks?.length || 0,
  });