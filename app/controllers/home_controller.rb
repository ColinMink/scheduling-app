class HomeController < ApplicationController
  def index
    @technicans = Technican.all
    @locations = Location.all
    @workOrders = WorkOrder.all
  end
end
