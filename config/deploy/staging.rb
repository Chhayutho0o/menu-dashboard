set :application, "core-e-menu-dashboard"
set :deploy_to, "/var/www/#{fetch(:application)}"
set :repo_url, "git@github.com-core_e_menu_dashboard:aasatech/core-e-menu-dashboard.git"

server "82.197.71.41", user: "deployer", roles: %w{app db web}

namespace :deploy do
  task :build_dist do
    on roles :all do
      within release_path do
        execute "cd #{release_path} && #{fetch(:nvm_prefix)} yarn build"
      end
    end
  end

  task :restart do
    on roles :all do
      within current_path do
        execute "cd #{current_path} && #{fetch(:nvm_prefix)} pm2 startOrRestart app.json"
      end
    end
  end

  before 'deploy:publishing', :build_dist
  after 'deploy:publishing', :restart
end