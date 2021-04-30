class WorkOrder < ApplicationRecord
    has_one :location
    has_one :technican
end
