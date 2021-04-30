class WorkOrder < ApplicationRecord
    belongs_to :location
    belongs_to :technican
end
