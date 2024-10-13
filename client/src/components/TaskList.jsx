import React from "react";
import { Card, CardContent, CardHeader } from "./Card";

const TaskList = () => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Last tasks</h2>
          <p className="text-sm text-gray-500">
            117 total, proceed to resolve them
          </p>
        </div>
        <div className="flex space-x-4">
          <div className="text-center">
            <span className="text-3xl font-bold">94</span>
            <p className="text-sm text-gray-500">Done</p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold">23</span>
            <p className="text-sm text-gray-500">In progress</p>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="pb-2">Name</th>
            <th className="pb-2">Admin</th>
            <th className="pb-2">Members</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Run time</th>
            <th className="pb-2">Finish date</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample row, repeat for more tasks */}
          <tr>
            <td className="py-2">ClientOnboarding - Circle</td>
            <td>
              <img
                src="/api/placeholder/32/32"
                alt="Samanta J."
                className="w-8 h-8 rounded-full"
              />
            </td>
            <td>3</td>
            <td>
              <span className="text-blue-500">In progress</span>
            </td>
            <td>6 hours</td>
            <td>6 Mon</td>
          </tr>
          {/* Add more rows here */}
        </tbody>
      </table>
    </CardContent>
  </Card>
);

export default TaskList;
