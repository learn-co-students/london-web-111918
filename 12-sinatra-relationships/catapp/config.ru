require './config/environment'

use Rack::MethodOverride

if ActiveRecord::Migrator.needs_migration?
  raise 'Migrations are pending. Run `rake db:migrate` to resolve the issue.'
end

use HumansController
use CatsController
use ToysController

run ApplicationController
