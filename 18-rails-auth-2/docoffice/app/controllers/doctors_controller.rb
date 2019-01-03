class DoctorsController < ApplicationController
  before_action :find_doc, only: [:show, :edit, :update, :destroy]

  def index
    session[:doctors_seen] ||= []
    @doctors = Doctor.all.reject { |doc| session[:doctors_seen].include?(doc.id) }
    # byebug
  end

  def show
    if session[:doctors_seen]
      session[:doctors_seen] << @doctor.id
    else
      session[:doctors_seen] = []
      session[:doctors_seen] << @doctor.id
    end
  end

  def new
    @doctor = Doctor.new
    @chickens = Chicken.all
  end

  def create
    @doctor = Doctor.create(doctor_params)
    if @doctor.valid?
      redirect_to doctors_path
    else
      flash[:errors] = @doctor.errors.full_messages
      redirect_to new_doctor_path
    end
  end

  def edit
    @chickens = Chicken.all
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
    params.require(:doctor).permit(:name, :speciality, chicken_ids: [], patient_ids: [])
  end

end
