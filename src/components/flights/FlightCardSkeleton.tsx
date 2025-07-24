import React from 'react';

const FlightCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        {/* Airline info skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
        
        {/* Price skeleton */}
        <div className="text-right">
          <div className="h-6 bg-gray-200 rounded w-32 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-20 ml-auto"></div>
        </div>
      </div>

      {/* Flight times skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <div className="h-6 bg-gray-200 rounded w-16 mb-2 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-12 mx-auto"></div>
        </div>
        
        <div className="flex-1 mx-4">
          <div className="relative">
            <div className="h-px bg-gray-200 w-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="h-6 bg-gray-200 rounded w-16 mb-2 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-12 mx-auto"></div>
        </div>
      </div>

      {/* Additional info skeleton */}
      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex gap-4">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="h-10 bg-green-100 rounded-lg w-32"></div>
      </div>

      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </div>
  );
};

export const FlightCardSkeletonGroup: React.FC = () => {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="relative overflow-hidden">
          <FlightCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export default FlightCardSkeleton;