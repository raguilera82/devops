#!groovy
 
import jenkins.model.*
import hudson.security.*
import jenkins.security.s2m.AdminWhitelistRule
 
import hudson.tasks.Maven.MavenInstallation;
import hudson.tools.*;
import hudson.util.DescribableList;

def jenkins = Jenkins.getInstance()

/*
 * Create admin user
 */ 
def user = new File("/run/secrets/jenkins-user").text.trim()
def pass = new File("/run/secrets/jenkins-pass").text.trim()
 
def hudsonRealm = new HudsonPrivateSecurityRealm(false)
hudsonRealm.createAccount(user, pass)
jenkins.setSecurityRealm(hudsonRealm)
 
def strategy = new FullControlOnceLoggedInAuthorizationStrategy()
jenkins.setAuthorizationStrategy(strategy)
jenkins.save()
 
jenkins.getInjector().getInstance(AdminWhitelistRule.class).setMasterKillSwitch(false)

/*
 * Add Maven tool with name 'mvn2'
 */
def mavenDesc = jenkins.getExtensionList(hudson.tasks.Maven.DescriptorImpl.class)[0]

def isp = new InstallSourceProperty()
def autoInstaller = new hudson.tasks.Maven.MavenInstaller("3.5.0")
isp.installers.add(autoInstaller)

def proplist = new DescribableList<ToolProperty<?>, ToolPropertyDescriptor>()
proplist.add(isp)

def installation = new MavenInstallation("mvn3", "", proplist)

mavenDesc.setInstallations(installation)
mavenDesc.save()
