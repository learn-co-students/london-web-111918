class DoctorsController < ApplicationController
  before_action :find_doc, only: [:show, :edit, :update, :destroy]

  def index
    @doctors = Doctor.all
  end

  def show
  end

  def new
    @doctor = Doctor.new
  end

  def create
    @doctor = Doctor.create(doctor_params)
    redirect_to doctors_path
  end

  def edit
  end

  def update
    @doctor.update(doctor_params)
    redirect_to doctor_path(@doctor)

  end

  def destroy
    @doctor.destroy
  end

  private

  def find_doc
    @doctor = Doctor.find(params[:id])
  end

  def doctor_params
    params.require(:doctor).permit(:name, :speciality, chicken_ids: [])
  end

end
