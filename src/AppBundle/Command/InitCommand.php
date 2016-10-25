<?php
namespace AppBundle\Command;


use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;


class InitCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('init')
            ->setDescription('Initializes any further configurations needed for the project to run.');

        /* ->addArgument(
          'name',
          InputArgument::OPTIONAL,
          'Who do you want to greet?'
      )
      ->addOption(
          'yell',
          null,
          InputOption::VALUE_NONE,
          'If set, the task will yell in uppercase letters'
      )*/
    }
    protected function execute(InputInterface $input, OutputInterface $output)
    {
       
        $failedTasks=0;
        
        
        if ($failedTasks<=0){
            $output->writeln("Successfully initialised project!");
        }else {
            $output->writeln("Failed to run {$failedTasks} tasks");
        }
    }
}